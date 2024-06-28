import { genSalt, hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import {
  repoAddTenant,
  repoAddUser,
  repoFindTenant,
  repoFindUser,
  repoTenantChangePassword,
  repoTenantCompletePassword,
  repoUserChangePassword,
  repoUserCompletePassword,
} from '../repository/auth.repository';

// Define types for User and Tenant
type User = {
  id: number;
  email: string;
  username: string;
  password: string;
};

type Tenant = {
  id: number;
  email: string;
  username: string;
  password: string;
};

// Password hashing function
const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

// Token creation function
const createToken = (
  payload: object,
  secret: string,
  expiresIn: string,
): string => {
  return sign(payload, secret, { expiresIn });
};

// Email transporter setup
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

// Function to send email
const sendEmail = async (emailOptions: any) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};

// register function for both user and tenant
const registerUser = async (request: User | Tenant, isUser: boolean) => {
  try {
    const existingEntity = await repoFindUser(request.email);

    if (existingEntity) {
      //console.log(`${isUser ? 'User' : 'Tenant'} with email ${request.email} already exists.`);
      return {
        status: 401,
        success: false,
        message: 'Email already registered',
      };
    }

    await repoAddUser(request.email);

    const verificationToken = createToken(
      { email: request.email },
      'verificationKey',
      '1d',
    );
    sendEmail({
      subject: 'Email Verification',
      text: `Please verify your email by clicking the link: http://localhost:6570/api/auth/verify-email?token=${verificationToken}`,
      to: request.email,
      from: process.env.EMAIL,
    });

    //console.log(`${isUser ? 'User' : 'Tenant'} registered successfully. Verification email sent to ${request.email}.`);
    return {
      status: 201,
      success: true,
      message:
        'Register successfully. Please check your email to verify your account.',
      data: request,
    };
  } catch (error) {
    //console.log(`Error during registration: ${(error as Error).message}`);
    return {
      status: 500,
      message: 'Server error',
      error: (error as Error).message,
    };
  }
};

const registerTenant = async (request: User | Tenant, isUser: boolean) => {
  try {
    const existingEntity = await repoFindTenant(request.email);

    if (existingEntity) {
      //console.log(`${isUser ? 'User' : 'Tenant'} with email ${request.email} already exists.`);
      return {
        status: 401,
        success: false,
        message: 'Email already registered',
      };
    }

    await repoAddTenant(request.email);

    const verificationToken = createToken(
      { email: request.email },
      'verificationKey',
      '1d',
    );
    sendEmail({
      subject: 'Email Verification',
      text: `Please verify your email by clicking the link: http://localhost:6570/api/auth/verify-email?token=${verificationToken}`,
      to: request.email,
      from: process.env.EMAIL,
    });

    //console.log(`${isUser ? 'User' : 'Tenant'} registered successfully. Verification email sent to ${request.email}.`);
    return {
      status: 201,
      success: true,
      message:
        'Register successfully. Please check your email to verify your account.',
      data: request,
    };
  } catch (error) {
    //console.log(`Error during registration: ${(error as Error).message}`);
    return {
      status: 500,
      message: 'Server error',
      error: (error as Error).message,
    };
  }
};

// User registration service
export const serviceRegisterUser = async (request: User) => {
  return registerUser(request, true);
};

// Tenant registration service
export const serviceRegisterTenant = async (request: Tenant) => {
  return registerTenant(request, false);
};

// Change password for a user
export const serviceChangeUserPassword = async (
  email: string,
  currentPassword: string,
  newPassword: string,
) => {
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
    //console.log("User password changed successfully.");
    return {
      status: 200,
      success: true,
      message: 'User password changed successfully.',
    };
  } catch (error) {
    //console.log(`Error changing user password: ${(error as Error).message}`);
    return {
      status: 500,
      success: false,
      message: 'Server error',
      error: (error as Error).message,
    };
  }
};

// Change password for a tenant
export const serviceChangeTenantPassword = async (
  email: string,
  currentPassword: string,
  newPassword: string,
) => {
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
    //console.log("Tenant password changed successfully.");
    return {
      status: 200,
      success: true,
      message: 'Tenant password changed successfully.',
    };
  } catch (error) {
    //console.log(`Error changing tenant password: ${(error as Error).message}`);
    return {
      status: 500,
      success: false,
      message: 'Server error',
      error: (error as Error).message,
    };
  }
};

export const serviceCompleteRegistrationUser = async (data: {
  email: string;
  username: string;
  password: string;
}) => {
  try {
    const user = await repoFindUser(data.email);
    if (!user || user.verified === false) {
      return {
        status: 400,
        success: false,
        message: 'Email not verified or user not found',
      };
    }

    const hashedPassword = await hashPassword(data.password);
    await repoUserCompletePassword(data.email, data.username, hashedPassword);

    return {
      status: 200,
      success: true,
      message: 'Registration completed successfully',
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: 'Server error',
    };
  }
};

export const serviceCompleteRegistrationTenant = async (data: {
  email: string;
  username: string;
  password: string;
}) => {
  try {
    const user = await repoFindTenant(data.email);
    if (!user || user.verified === false) {
      return {
        status: 400,
        success: false,
        message: 'Email not verified or user not found',
      };
    }

    const hashedPassword = await hashPassword(data.password);
    await repoTenantCompletePassword(data.email, data.username, hashedPassword);

    return {
      status: 200,
      success: true,
      message: 'Registration completed successfully',
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: 'Server error',
    };
  }
};
