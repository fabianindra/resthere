import passport from 'passport';
import { User, Tenant } from '@prisma/client';
import {
  configureGoogleStrategyUser,
  configureGoogleStrategyTenant,
  serializeUser,
  deserializeUser,
  serializeTenant,
  deserializeTenant,
} from './services/auth.google.service';

passport.use('google-user', configureGoogleStrategyUser());
passport.use('google-tenant', configureGoogleStrategyTenant());

passport.serializeUser((user, done) => {
  if ((user as User).email) {
    serializeUser(user as User, done);
  } else {
    serializeTenant(user as User, done);
  }
});

passport.deserializeUser((id, done) => {
  deserializeUser(id as number, (err, user) => {
    if (err || !user) {
      deserializeTenant(id as number, done);
    } else {
      done(null, user);
    }
  });
});

export default passport;
