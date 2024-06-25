import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { PrismaClient, User, Tenant } from '@prisma/client';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

interface ServiceRegisterGoogleResponse {
  user: User;
  token: string;
  role: string;
}
interface ServiceRegisterGoogleResponseTenant {
  user: Tenant;
  token: string;
  role: string;
}

function generateRandomPassword(length: number = 12): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

//user

export const serviceRegisterUserGoogle = async (accessToken: string, refreshToken: string, profile: Profile): Promise<ServiceRegisterGoogleResponse> => {
  try {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      throw new Error('No email associated with this account');
    }

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          username: profile.displayName || '',
          email,
          password: generateRandomPassword(),
        },
      });
    }

    const jwtPayload = { email: user.email, userType: 'user' };
    const token = sign(jwtPayload, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return { user, token, role: 'user' };
  } catch (error) {
    throw error;
  }
};

export const serializeUser = (user: User, done: (err: any, id?: number) => void) => {
  done(null, user.id);
};

export const deserializeUser = async (id: number, done: (err: any, user?: User) => void) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
};

export const configureGoogleStrategyUser = () => {
  return new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:6570/api/auth/google-user/callback',
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done) => {
      try {
        const result = await serviceRegisterUserGoogle(accessToken, refreshToken, profile);
        done(null, result.user);
      } catch (error) {
        done(error);
      }
    }
  );
};


//Tenant

export const serviceRegisterTenantGoogle = async (accessToken: string, refreshToken: string, profile: Profile): Promise<ServiceRegisterGoogleResponseTenant> => {
  try {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      throw new Error('No email associated with this account');
    }

    let tenant = await prisma.tenant.findUnique({ where: { email } });

    if (!tenant) {
      tenant = await prisma.tenant.create({
        data: {
          username: profile.displayName || '',
          email,
          password: generateRandomPassword(),
        },
      });
    }

    const jwtPayload = { email: tenant.email, userType: 'tenant' };
    const token = sign(jwtPayload, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return { user: tenant, token, role: 'tenant' }; 
  } catch (error) {
    throw error;
  }
};


export const serializeTenant = (user: User, done: (err: any, id?: number) => void) => {
  done(null, user.id);
};

export const deserializeTenant = async (id: number, done: (err: any, tenant?: Tenant) => void) => {
  try {
    const tenant = await prisma.tenant.findUnique({ where: { id } });
    if (!tenant) {
      throw new Error('Tenant not found');
    }
    done(null, tenant);
  } catch (error) {
    done(error);
  }
};


export const configureGoogleStrategyTenant = () => {
  return new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:6570/api/auth/google-tenant/callback',
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done) => {
      try {
        const result = await serviceRegisterTenantGoogle(accessToken, refreshToken, profile);
        done(null, result.user);
      } catch (error) {
        done(error);
      }
    }
  );
};