import { Router, Request, Response } from 'express';
import passport from '../passport.config';
import { sign } from 'jsonwebtoken';
import { User } from '@prisma/client';
import {
  changeTenantPassword,
  changeUserPassword,
  completeRegisterTenant,
  completeRegisterUser,
  handleResetPassword,
  registerTenant,
  registerUser,
  sendResetPasswordEmail,
  tenantLogin,
  userLogin,
  verifyEmail,
} from '../controllers/auth.controller';
import { serviceVerifyToken } from '../middlewares/auth.middleware';

const authRouter = Router();

authRouter.post('/register-user', registerUser);
authRouter.post('/register-user-complete', completeRegisterUser);
authRouter.post('/register-tenant', registerTenant);
authRouter.post('/register-tenant-complete', completeRegisterTenant);

authRouter.post('/user-login', userLogin);
authRouter.post('/tenant-login', tenantLogin);

authRouter.get('/verify-email', verifyEmail);
authRouter.post(
  '/verify-token',
  serviceVerifyToken,
  (req: Request, res: Response) => {
    res.status(200).json({ message: 'Token is valid' });
  },
);

authRouter.get(
  '/google-user',
  passport.authenticate('google-user', { scope: ['profile', 'email'] }),
);
authRouter.get(
  '/google-user/callback',
  passport.authenticate('google-user', {
    failureRedirect: 'http://localhost:3000',
  }),
  (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new Error('User not found');
      }
      const user = req.user as User;
      const { id, username, email } = user;
      const token = sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
      });
      const role = 'user';

      res.redirect(
        `http://localhost:3000/?token=${token}&username=${username}&email=${email}&role=${role}&userId=${id}`,
      );
    } catch (error) {
      console.error('Error generating token:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
);

authRouter.get(
  '/google-tenant',
  passport.authenticate('google-tenant', { scope: ['profile', 'email'] }),
);
authRouter.get(
  '/google-tenant/callback',
  passport.authenticate('google-tenant', {
    failureRedirect: 'http://localhost:3000',
  }),
  (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new Error('User not found');
      }
      const user = req.user as User;
      const { id, username, email } = user;
      const token = sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
      });
      const role = 'tenant';

      res.redirect(
        `http://localhost:3000/?token=${token}&username=${username}&email=${email}&role=${role}&userId=${id}`,
      );
    } catch (error) {
      console.error('Error generating token:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
);

authRouter.post('/change-password-user', changeUserPassword);
authRouter.post('/change-password-tenant', changeTenantPassword);

authRouter.post('/send-reset-password-email', sendResetPasswordEmail);
authRouter.post('/reset-password', handleResetPassword);


export default authRouter;
