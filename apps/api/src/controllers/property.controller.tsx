import { Request, Response } from 'express';
import { serviceGetALLProperty } from '../services/property.services';

export const getPropertyController = async (req: Request, res: Response) => {
  const response = await serviceGetALLProperty();
  return res.status(200).send(response);
};
