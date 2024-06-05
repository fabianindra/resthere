import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import {
  serviceRegisterUser,
  serviceRegisterTenant,
  serviceLogin,
  serviceVerifyToken,
} from "../services/auth.service";

type User = {
  id: number;
  email: string;
  username: string;
  password: string; 
};

type Tenant = {
  id: number;
  email: string;
  username: string;
  password: string; 
};

type UserModel = Omit<User, 'password'> & {
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

type TenantModel = Omit<Tenant, 'password'> & {
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

const prisma = new PrismaClient();

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

export const verifyToken = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const result = await serviceVerifyToken(req, next);
  return res.status(Number(result?.status)).send(result);
};