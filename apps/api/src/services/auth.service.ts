import { genSalt, hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import {
  repoAddTenant,
  repoAddUser,
  repoFindTenant,
  repoFindUser,
  repoVerifyUser,
  repoVerifyTenant
} from "../repository/auth.repository";

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

type UserModel = Omit<User, 'password'> & {
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

type TenantModel = Omit<Tenant, 'password'> & {
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

interface TokenPayload {
  email: string;
}

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'finprokelompok4@gmail.com',
    pass: 'purwadhika'
  }
});

const sendVerificationEmail = (email: string, token: string) => {
  const mailOptions = {
    from: 'finprokelompok4@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking the link: http://localhost:6570/api/auth/verify-email?token=${token}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

export const serviceRegisterUser = async (request: User) => {
  try {
    const existingUser: any = await repoFindUser(request.email);

    if (existingUser) {
      console.log(`User with email ${request.email} already exists.`);
      return {
        status: 401,
        success: false,
        message: "Email already registered",
      };
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(request.password, salt);
    await repoAddUser(request.username, request.email, hashedPassword);

    const verificationToken = sign({ email: request.email }, 'verificationKey', { expiresIn: '1d' });
    sendVerificationEmail(request.email, verificationToken);

    console.log(`User registered successfully. Verification email sent to ${request.email}.`);
    return {
      status: 201,
      success: true,
      message: "Register successfully. Please check your email to verify your account.",
      data: request,
    };
  } catch (error) {
    console.log(`Error during registration: ${(error as Error).message}`);
    return {
      status: 500,
      message: "Server error",
      error: (error as Error).message,
    };
  }
};

export const serviceRegisterTenant = async (request: User) => {
  try {
    const existingTenant: any = await repoFindTenant(request.email);

    if (existingTenant) {
      console.log(`Tenant with email ${request.email} already exists.`);
      return {
        status: 401,
        success: false,
        message: "Email already registered",
      };
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(request.password, salt);
    await repoAddTenant(request.username, request.email, hashedPassword);

    const verificationToken = sign({ email: request.email }, 'verificationKey', { expiresIn: '1d' });
    sendVerificationEmail(request.email, verificationToken);

    console.log(`Tenant registered successfully. Verification email sent to ${request.email}.`);
    return {
      status: 201,
      success: true,
      message: "Register successfully. Please check your email to verify your account.",
      data: request,
    };
  } catch (error) {
    console.log(`Error during registration: ${(error as Error).message}`);
    return {
      status: 500,
      message: "Server error",
      error: (error as Error).message,
    };
  }
};

export const serviceLogin = async (request: any) => {
  const { email, password }: { email: string; password: string } = request;
  try {
    const existingUser: any = await repoFindUser(email);
    const existingTenant: any = await repoFindTenant(email);

    if (!existingUser && !existingTenant) {
      return {
        status: 401,
        success: false,
        message: "Invalid email or password",
      };
    }

    if (existingUser) {
      if (!existingUser.verified) {
        return {
          status: 401,
          success: false,
          message: "Email not verified",
        };
      }

      const isValidPasswordUser = await compare(password, existingUser.password);
      if (isValidPasswordUser) {
        const jwtPayload = { email, userType: 'user' };
        const token = sign(jwtPayload, 'keyOFkey', { expiresIn: '1h' });
        delete existingUser.password;
        return {
          status: 201,
          success: true,
          message: "Login successfully",
          data: existingUser,
          token: token,
          role: "user"
        };
      }
    }

    if (existingTenant) {
      if (!existingTenant.verified) {
        return {
          status: 401,
          success: false,
          message: "Email not verified",
        };
      }

      const isValidPasswordTenant = await compare(password, existingTenant.password);
      if (isValidPasswordTenant) {
        const jwtPayload = { email, userType: 'tenant' };
        const token = sign(jwtPayload, 'keyOFkey', { expiresIn: '1h' });
        delete existingTenant.password;
        return {
          status: 201,
          success: true,
          message: "Login successfully",
          data: existingTenant,
          token: token,
          role: "tenant"
        };
      }
    }

    return {
      status: 401,
      success: false,
      message: "Invalid email or password",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Server error",
      error: (error as Error).message,
    };
  }
};

export const serviceVerifyToken = async (request: any, next: any) => {
  try {
    const token = request.header("Authorization")?.replace("Bearer ", "").trim();

    if (!token) {
      return {
        status: 401,
        message: "Invalid token, unauthorized",
      };
    }

    const verifiedUser = verify(token, "keyOFkey");
    if (!verifiedUser) {
      return {
        status: 401,
        message: "Expired token",
      };
    }

    request.user = verifiedUser as User;

    next();
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Register Error",
      error: (error as Error).message,
    };
  }
};

export const serviceVerifyEmail = async (request: any) => {
  const token = request.query.token;

  if (!token) {
    return {
      status: 400,
      message: "Verification token is missing",
    };
  }

  try {
    const decoded = verify(token, 'verificationKey') as TokenPayload;
    const email = decoded.email;

    const user = await repoFindUser(email);
    const tenant = await repoFindTenant(email);

    if (user) {
      await repoVerifyUser(email);
      return {
        status: 200,
        message: "Email verified successfully",
      };
    } else if (tenant) {
      await repoVerifyTenant(email);
      return {
        status: 200,
        message: "Email verified successfully",
      };
    } else {
      return {
        status: 400,
        message: "Invalid verification token",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Server error",
      error: (error as Error).message,
    };
  }
};
