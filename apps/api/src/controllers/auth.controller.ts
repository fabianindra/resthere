import { Request, Response } from 'express';
import {
  serviceRegisterUser,
  serviceRegisterTenant,
  serviceChangeUserPassword,
  serviceChangeTenantPassword,
} from '../services/auth.register.service';
import { serviceLogin } from '../services/auth.login.service';
import { serviceVerifyEmail } from '../services/auth.verify.service';

export const registerUser = async (req: Request, res: Response) => {
  const result = await serviceRegisterUser(req.body);
  return res.status(Number(result?.status)).send(result);
};

export const registerTenant = async (req: Request, res: Response) => {
  const result = await serviceRegisterTenant(req.body);
  return res.status(Number(result?.status)).send(result);
};

export const login = async (req: Request, res: Response) => {
  const result = await serviceLogin(req.body);
  return res.status(Number(result?.status)).send(result);
};

export const verifyEmail = async (req: Request, res: Response) => {
  const result = await serviceVerifyEmail(req);
  return res.status(Number(result?.status)).send(result);
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
