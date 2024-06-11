import { Request, Response } from "express";
import { serviceRegisterUser, serviceRegisterTenant, serviceLogin, serviceVerifyEmail } from "../services/auth.service";

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
