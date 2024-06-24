import passport from 'passport';
import { User, Tenant } from '@prisma/client';
import { 
  configureGoogleStrategyUser, 
  configureGoogleStrategyTenant, 
  serializeUser, 
  deserializeUser, 
  serializeTenant, 
  deserializeTenant 
} from './services/auth.google.service';

// Configure User Google Strategy
passport.use('google-user', configureGoogleStrategyUser());

// Serialize and Deserialize User
passport.serializeUser((user, done) => serializeUser(user as User, done));
passport.deserializeUser((id, done) => deserializeUser(id as number, done));

// Configure Tenant Google Strategy
passport.use('google-tenant', configureGoogleStrategyTenant());

// Serialize and Deserialize Tenant
passport.serializeUser((user, done) => serializeTenant(user as Tenant, done));
passport.deserializeUser((id, done) => deserializeTenant(id as number, done));

export default passport;
