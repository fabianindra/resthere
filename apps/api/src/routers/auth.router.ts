import { Router } from 'express';
import {
  login,
  registerTenant,
  registerUser,
} from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register-user', registerUser);
authRouter.post('/register-tenant', registerTenant);
authRouter.post('/login', login);

export default authRouter;
