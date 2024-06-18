import {
  serviceAddSpecialPrice,
  serviceDeleteSpecialPrice,
  serviceGetSpecialPriceById,
  serviceGetSpecialPriceByRoom,
  serviceUpdateSpecialPrice,
} from '../services/sepecialprice.service';
import { NextFunction, Request, Response } from 'express';

export const getSpecialPriceByRoomController = async (
  req: Request,
  res: Response,
) => {
  const response = await serviceGetSpecialPriceByRoom(req);
  return res.status(Number(response?.status)).send(response);
};

export const getSpecialPriceByIdController = async (
  req: Request,
  res: Response,
) => {
  const response = await serviceGetSpecialPriceById(req);
  return res.status(Number(response?.status)).send(response);
};

export const addSpeialPriceController = async (req: Request, res: Response) => {
  const response = await serviceAddSpecialPrice(req);
  return res.status(Number(response?.status)).send(response);
};

export const updateSpecialPrice = async (req: Request, res: Response) => {
  const response = await serviceUpdateSpecialPrice(req);
  return res.status(Number(response?.status)).send(response);
};

export const deleteSpecialPrice = async (req: Request, res: Response) => {
  const response = await serviceDeleteSpecialPrice(req);
  return res.status(Number(response?.status)).send(response);
};
