import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import {
  repoFindTenant,
  repoFindUser
} from "../repository/auth.repository";

type UserOrTenant = {
  id: number;
  email: string;
  username: string;
  password: string;
  verified: boolean;
};

// Password comparison function
const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await compare(password, hashedPassword);
};

// Token creation function
const createToken = (payload: object, secret: string, expiresIn: string): string => {
  return sign(payload, secret, { expiresIn });
};

// Login service for both user and tenant
export const serviceLogin = async (request: any) => {
  const { email, password }: { email: string; password: string } = request;
  try {
    const existingUser = await repoFindUser(email);
    const existingTenant = await repoFindTenant(email);

    if (!existingUser && !existingTenant) {
      return {
        status: 401,
        success: false,
        message: "Invalid email or password",
      };
    }

    const entity: UserOrTenant | null = existingUser || existingTenant;
    if (!entity) {
      return {
        status: 401,
        success: false,
        message: "Invalid email or password",
      };
    }

    const userType = existingUser ? 'user' : 'tenant';

    if (!entity.verified) {
      return {
        status: 401,
        success: false,
        message: "Email not verified",
      };
    }

    const isValidPassword = await comparePasswords(password, entity.password);
    if (isValidPassword) {
      const jwtPayload = { email, userType };
      const token = createToken(jwtPayload, 'keyOFkey', '1h');
      const { password, ...entityWithoutPassword } = entity; // Destructuring to remove password
      return {
        status: 201,
        success: true,
        message: "Login successfully",
        data: entityWithoutPassword,
        token: token,
        role: userType
      };
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
