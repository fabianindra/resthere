import {
  serviceGetProfile,
  serviceUpdateFotoProfile,
  serviceUpdateProfile,
} from '../services/profile.services';
import { NextFunction, Request, Response } from 'express';

export const getProfileUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const response = await serviceGetProfile(req);
  return res.status(Number(response?.status)).send(response);
};

export const updateProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const response = await serviceUpdateProfile(req);
  return res.status(Number(response?.status)).send(response);
};

export const updateFotoProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const response = await serviceUpdateFotoProfile(req);
  return res.status(Number(response?.status)).send(response);
};
