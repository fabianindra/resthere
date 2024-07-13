import { hash, genSalt, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { verify } from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { repoFindTenant, repoFindUser, repoTenantChangePassword, repoUserChangePassword, repoUserChangeEmail, repoTenantChangeEmail } from '../repository/auth.repository';

const FRONTEND_URL = process.env.FRONTEND_URL;
const BACKEND_URL = process.env.BACKEND_URL;

const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

const createToken = (payload: object, secret: string, expiresIn: string): string => {
  return sign(payload, secret, { expiresIn });
};

const createVerificationToken = (email: string): string => {
  return sign({ email }, 'verificationKey');
};

const createTransporter = async () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground',
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });
  const accessToken = await new Promise<string>((resolve, reject) => {
    oauth2Client.getAccessToken((err: any, token: any) => {
      if (err) {
        reject(err);
      }
      resolve(token as string);
    });
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  } as nodemailer.TransportOptions);

  return transporter;
};

const sendEmail = async (emailOptions: any) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};

export const serviceChangeUserPassword = async (email: string, currentPassword: string, newPassword: string) => {
  try {
    const user = await repoFindUser(email);
    if (!user) {
      return {
        status: 404,
        success: false,
        message: 'User not found',
      };
    }
    const isMatch = await compare(currentPassword, user.password);
    if (!isMatch) {
      return {
        status: 400,
        success: false,
        message: 'Current password is incorrect',
      };
    }
    const hashedPassword = await hashPassword(newPassword);
    await repoUserChangePassword(email, hashedPassword);
    return {
      status: 200,
      success: true,
      message: 'User password changed successfully.',
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: 'Server error',
      error: (error as Error).message,
    };
  }
};

export const serviceChangeTenantPassword = async (email: string, currentPassword: string, newPassword: string) => {
  try {
    const tenant = await repoFindTenant(email);
    if (!tenant) {
      return {
        status: 404,
        success: false,
        message: 'Tenant not found',
      };
    }
    const isMatch = await compare(currentPassword, tenant.password);
    if (!isMatch) {
      return {
        status: 400,
        success: false,
        message: 'Current password is incorrect',
      };
    }
    const hashedPassword = await hashPassword(newPassword);
    await repoTenantChangePassword(email, hashedPassword);
    return {
      status: 200,
      success: true,
      message: 'Tenant password changed successfully.',
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: 'Server error',
      error: (error as Error).message,
    };
  }
};

export const serviceSendResetPasswordEmail = async (email: string, role: string) => {
  try {
    const user = role === 'user' ? await repoFindUser(email) : await repoFindTenant(email);
    if (!user) {
      return {
        status: 404,
        success: false,
        message: `${role.charAt(0).toUpperCase() + role.slice(1)} not found`,
      };
    }
    const resetToken = createToken(
      { email: email, role },
      'verificationKey',
      '1h',
    );
    const resetLink = `${FRONTEND_URL}/reset-password/${resetToken}`;
    await sendEmail({
      to: email,
      from: process.env.EMAIL,
      subject: 'Reset Your Password',
      text: `Please use the following link to reset your password: ${resetLink}`,
    });
    return {
      status: 200,
      success: true,
      message: 'Reset password email sent successfully',
    };
  } catch (error:any) {
    return {
      status: 500,
      success: false,
      message: 'Server error',
      error: error.message,
    };
  }
};

export const serviceResetPassword = async (newPassword: string, role: string, email: string, token: string) => {
    try {
      const decoded = verify(token, 'verificationKey') as JwtPayload;
      if (decoded.email !== email) {
        throw new Error('Invalid token');
      }
      const hashedPassword = await hashPassword(newPassword);
      if (role === 'user') {
        await repoUserChangePassword(email, hashedPassword);
      } else if (role === 'tenant') {
        await repoTenantChangePassword(email, hashedPassword);
      } else {
        throw new Error('Invalid role');
      }
      return {
        status: 200,
        success: true,
        message: 'Password reset successfully',
      };
    } catch (error: any) {
      return {
        status: 400,
        success: false,
        message: 'Invalid or expired token',
        error: error.message,
      };
    }
  };

  export const serviceResetEmail = async (email: string, role: string, newEmail: string) => {
    try {
      let updatedEntity;
      if (role === 'user') {
        updatedEntity = await repoUserChangeEmail(email, newEmail);
      } else if (role === 'tenant') {
        updatedEntity = await repoTenantChangeEmail(email, newEmail);
      } else {
        throw new Error('Invalid role');
      }
      const verificationToken = createVerificationToken(newEmail);
      const verificationLink = `${BACKEND_URL}/auth/verify-email-reset?token=${verificationToken}&role=${role}`;
      await sendEmail({
        to: newEmail,
        from: process.env.EMAIL,
        subject: 'Verify Your New Email',
        text: `Please verify your new email by clicking the following link: ${verificationLink}`,
      });
      return {
        status: 200,
        success: true,
        message: 'Email updated and verification email sent successfully',
      };
    } catch (error: any) {
      return {
        status: 400,
        success: false,
        message: 'Invalid or expired token',
        error: error.message,
      };
    }
  };