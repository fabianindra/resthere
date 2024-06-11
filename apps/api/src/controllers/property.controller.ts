import { NextFunction, Request, Response } from 'express';
import {
  serviceAddProperty,
  serviceCheckProperty,
  serviceDeleteProperty,
  serviceGetPropertyById,
  serviceGetPropertyByRooms,
  serviceGetPropertyByTenant,
  serviceUpdateProperty,
} from '../services/property.services';

export const getPropertyControllerByRooms = async (
  req: Request,
  res: Response,
) => {
  const response = await serviceGetPropertyByRooms(req);
  return res.status(Number(response?.status)).send(response);
};

export const getPropertyControllerByTenant = async (
  req: Request,
  res: Response,
) => {
  const response = await serviceGetPropertyByTenant(req);
  return res.status(Number(response?.status)).send(response);
};

export const getPropertyControllerById = async (
  req: Request,
  res: Response,
) => {
  const response = await serviceGetPropertyById(req);
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
