import { Request, Response } from 'express';
import {
  serviceRegisterUser,
  serviceRegisterTenant,
  serviceCompleteRegistrationUser,
  serviceCompleteRegistrationTenant,
} from '../services/auth.register.service';
import { 
  serviceSendResetPasswordEmail, 
  serviceResetPassword,  
  serviceChangeUserPassword, 
  serviceChangeTenantPassword
} from '@/services/auth.password.service';
import { serviceTenantLogin, serviceUserLogin } from '../services/auth.login.service';
import { serviceVerifyEmail } from '../services/auth.verify.service';

export const registerUser = async (req: Request, res: Response) => {
  const result = await serviceRegisterUser(req.body);
  return res.status(Number(result?.status)).send(result);
};

export const completeRegisterUser = async (req: Request, res: Response) => {
  const result = await serviceCompleteRegistrationUser(req.body);
  return res.status(Number(result?.status)).send(result);
};

export const registerTenant = async (req: Request, res: Response) => {
  const result = await serviceRegisterTenant(req.body);
  return res.status(Number(result?.status)).send(result);
};

export const completeRegisterTenant = async (req: Request, res: Response) => {
  const result = await serviceCompleteRegistrationTenant(req.body);
  return res.status(Number(result?.status)).send(result);
};

export const userLogin = async (req: Request, res: Response) => {
  const result = await serviceUserLogin(req.body);
  return res.status(Number(result?.status)).send(result);
};

export const tenantLogin = async (req: Request, res: Response) => {
  const result = await serviceTenantLogin(req.body);
  return res.status(Number(result?.status)).send(result);
};

export const verifyEmail = async (req: Request, res: Response) => {
  const result = await serviceVerifyEmail(req);

  if (result.status === 200) {
    const email = result.email;
    const type = result.type;

    if (type === 'user') {
      return res.redirect(`http://localhost:3000/register-user/complete-register-user?email=${email}`);
    } else if (type === 'tenant') {
      return res.redirect(`http://localhost:3000/register-tenant/complete-register-tenant?email=${email}`);
    } else {
      return res.status(400).send({
        status: 400,
        message: "Unknown verification type"
      });
    }
  } else {
    return res.status(Number(result?.status)).send(result);
  }
};

export const changeUserPassword = async (req: Request, res: Response) => {
  const { email, currentPassword, newPassword } = req.body;
  const result = await serviceChangeUserPassword(email, currentPassword, newPassword);
  return res.status(Number(result?.status)).send(result);
};

export const changeTenantPassword = async (req: Request, res: Response) => {
  const { email, currentPassword, newPassword } = req.body;
  const result = await serviceChangeTenantPassword(email, currentPassword, newPassword);
  return res.status(Number(result?.status)).send(result);
};

export const sendResetPasswordEmail = async (req: Request, res: Response) => {
  const { email, role } = req.body;
  const result = await serviceSendResetPasswordEmail(email, role);
  res.status(result.status).json(result);
};

export const handleResetPassword = async (req: Request, res: Response) => {
  const { newPassword, role, email, token } = req.body;
  const result = await serviceResetPassword(String(newPassword), String(role), String(email), String(token));
  res.status(result.status).json(result);
};

