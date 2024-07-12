import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { repoFindTenant, repoFindUser } from '../repository/auth.repository';

type UserOrTenant = {
  id: number;
  email: string;
  username: string;
  password: string;
  verified: boolean;
};

const comparePasswords = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await compare(password, hashedPassword);
};

const createToken = (payload: object, expiresIn: string): string => {
  const secret = process.env.JWT_SECRET!;
  return sign(payload, secret, { expiresIn });
};

export const serviceUserLogin = async (request: any) => {
  const { email, password }: { email: string; password: string } = request;
  try {
    const existingUser = await repoFindUser(email);

    if (!existingUser) {
      return {
        status: 401,
        success: false,
        message: 'Invalid email or password',
      };
    }

    const entity: UserOrTenant | null = existingUser;
    if (!entity) {
      return {
        status: 401,
        success: false,
        message: 'Invalid email or password',
      };
    }

    const userType = 'user';

    if (!entity.verified) {
      return {
        status: 401,
        success: false,
        message: 'Email not verified',
      };
    }

    const isValidPassword = await comparePasswords(password, entity.password);
    if (isValidPassword) {
      const jwtPayload = { email, userType };
      const token = createToken(jwtPayload, '1h');
      const { password, ...entityWithoutPassword } = entity;
      return {
        status: 201,
        success: true,
        message: 'Login successfully',
        data: entityWithoutPassword,
        token: token,
        role: userType,
      };
    }

    return {
      status: 401,
      success: false,
      message: 'Invalid email or password',
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: 'Server error',
      error: (error as Error).message,
    };
  }
};

export const serviceTenantLogin = async (request: any) => {
  const { email, password }: { email: string; password: string } = request;
  try {
    const existingTenant = await repoFindTenant(email);

    if (!existingTenant) {
      return {
        status: 401,
        success: false,
        message: 'Invalid email or password',
      };
    }

    const entity: UserOrTenant | null = existingTenant;
    if (!entity) {
      return {
        status: 401,
        success: false,
        message: 'Invalid email or password',
      };
    }

    const userType = 'tenant';

    if (!entity.verified) {
      return {
        status: 401,
        success: false,
        message: 'Email not verified',
      };
    }

    const isValidPassword = await comparePasswords(password, entity.password);
    if (isValidPassword) {
      const jwtPayload = { email, userType };
      const token = createToken(jwtPayload, '1h');
      const { password, ...entityWithoutPassword } = entity;
      return {
        status: 201,
        success: true,
        message: 'Login successfully',
        data: entityWithoutPassword,
        token: token,
        role: userType,
      };
    }

    return {
      status: 401,
      success: false,
      message: 'Invalid email or password',
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: 'Server error',
      error: (error as Error).message,
    };
  }
};
