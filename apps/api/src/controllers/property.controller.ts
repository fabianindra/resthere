import { Request, Response } from 'express';
import {
  serviceAddProperty,
  serviceDeleteProperty,
  serviceGetALLProperty,
  serviceUpdateProperty,
} from '../services/property.services';

export const getPropertyController = async (req: Request, res: Response) => {
  const response = await serviceGetALLProperty();
  return res.status(200).send(response);
};

export const addPropertyController = async (req: Request, res: Response) => {
  const response = await serviceAddProperty(req);
  return res.status(201).send(response);
};

export const updtePropertyController = async (req: Request, res: Response) => {
  const response = await serviceUpdateProperty(req);
  return res.status(201).send(response);
};

export const deletePropertyController = async (req: Request, res: Response) => {
  const response = await serviceDeleteProperty(req);
  return res.status(201).send(response);
};
