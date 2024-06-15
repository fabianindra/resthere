import { Router, Request, Response } from 'express';
import passport from '../passport.config';
import { sign } from 'jsonwebtoken';
import { User } from '@prisma/client';
import { login, registerTenant, registerUser, verifyEmail } from '../controllers/auth.controller';
import { serviceVerifyToken } from '@/middlewares/auth.middleware';

const authRouter = Router();

authRouter.post('/register-user', registerUser);
authRouter.post('/register-tenant', registerTenant);
authRouter.post('/login', login);

authRouter.get('/verify-email', verifyEmail);
authRouter.post('/verify-token', serviceVerifyToken, (req: Request, res: Response) => {
  res.status(200).json({ message: 'Token is valid' });
});


authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', passport.authenticate('google', {
  failureRedirect: 'http://localhost:3000',
}), (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new Error('User not found');
    }
    const user = req.user as User;
    const { username, email } = user;
    const token = sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    const role = 'user';

    res.redirect(`http://localhost:3000/?token=${token}&username=${username}&email=${email}&role=${role}`);
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default authRouter;
