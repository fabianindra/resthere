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
  if (!token) {
    return {
      status: 400,
      message: 'Verification token is missing',
    };
  }
  try {
    const decoded = verifyToken(token, 'verificationKey') as { email: string };
    const email = decoded.email;

    const user = await repoFindUser(email);
    const tenant = await repoFindTenant(email);

    if (user) {
      await repoVerifyUser(email);
      return {
        status: 200,
        message: 'Email verified successfully',
        email: email,
        type: 'user',
      };
    } else if (tenant) {
      await repoVerifyTenant(email);
      return {
        status: 200,
        message: 'Email verified successfully',
        email: email,
        type: 'tenant',
      };
    } else {
      return {
        status: 400,
        message: 'Invalid verification token',
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Server error',
      error: (error as Error).message,
    };
  }
};
