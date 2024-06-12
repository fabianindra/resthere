import passport from 'passport';
import { User } from '@prisma/client';
import { configureGoogleStrategy, serializeUser, deserializeUser } from './services/auth.google.service';

passport.use(configureGoogleStrategy());

passport.serializeUser((user, done) => serializeUser(user as User, done));

passport.deserializeUser((id, done) => deserializeUser(id as number, done));

export default passport;
