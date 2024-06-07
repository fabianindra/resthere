import { NextFunction, Request, Response } from 'express';
import {
  serviceAddProperty,
  serviceCheckProperty,
  serviceDeleteProperty,
  serviceGetALLProperty,
  serviceUpdateProperty,
} from '../services/property.services';

export const getPropertyController = async (req: Request, res: Response) => {
  const response = await serviceGetALLProperty(req);
  return res.status(Number(response?.status)).send(response);
};

export const addPropertyController = async (req: Request, res: Response) => {
  const response = await serviceAddProperty(req);
  return res.status(Number(response?.status)).send(response);
};

export const updtePropertyController = async (req: Request, res: Response) => {
  const response = await serviceUpdateProperty(req);
  return res.status(Number(response?.status)).send(response);
};

export const deletePropertyController = async (req: Request, res: Response) => {
  const response = await serviceDeleteProperty(req);
  return res.status(Number(response?.status)).send(response);
};

export const checkPropertyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const response = await serviceCheckProperty(req, next);
  if (response) {
    return res.status(Number(response.status)).send(response);
  }
};
