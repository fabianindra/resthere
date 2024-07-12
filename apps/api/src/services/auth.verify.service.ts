import { verify } from 'jsonwebtoken';
import {
  repoFindTenant,
  repoFindUser,
  repoVerifyUser,
  repoVerifyTenant,
} from '../repository/auth.repository';

const verifyToken = (token: string, secret: string): any => {
  return verify(token, secret);
};

export const serviceVerifyEmail = async (request: any) => {
  const token = request.query.token;
  const role = request.query.role;
  if (!token) {
    return {
      status: 400,
      message: 'Verification token is missing',
    };
  }
  if (!role) {
    return {
      status: 400,
      message: 'Role is missing',
    };
  }
  try {
    const decoded = verifyToken(token, 'verificationKey') as { email: string };
    const email = decoded.email;

    if (role === 'user') {
      const user = await repoFindUser(email);
      if (user) {
        await repoVerifyUser(email);
        return {
          status: 200,
          message: 'Email verified successfully',
          email: email,
          type: 'user',
        };
      }
    } else if (role === 'tenant') {
      const tenant = await repoFindTenant(email);
      if (tenant) {
        await repoVerifyTenant(email);
        return {
          status: 200,
          message: 'Email verified successfully',
          email: email,
          type: 'tenant',
        };
      }
    }

    return {
      status: 400,
      message: 'Invalid verification token or role',
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Server error',
      error: (error as Error).message,
    };
  }
};
