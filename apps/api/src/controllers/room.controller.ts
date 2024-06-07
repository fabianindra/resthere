import {
  serviceAddRoom,
  serviceCheckRoom,
  serviceDeleteRoom,
  serviceGetALLRoom,
  serviceUpdateRoom,
} from '../services/room.service';
import { NextFunction, Request, Response } from 'express';

export const getRoomController = async (req: Request, res: Response) => {
  const response = await serviceGetALLRoom();
  return res.status(Number(response?.status)).send(response);
};

export const addRoomController = async (req: Request, res: Response) => {
  const response = await serviceAddRoom(req);
  console.log(response, 'INI RESPONENT');
  return res.status(Number(response?.status)).send(response);
};

export const updateRoomController = async (req: Request, res: Response) => {
  const response = await serviceUpdateRoom(req);
  return res.status(Number(response?.status)).send(response);
};

export const deleteRoomController = async (req: Request, res: Response) => {
  const response = await serviceDeleteRoom(req);
  return res.status(Number(response?.status)).send(response);
};

export const checkRoomController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const response = await serviceCheckRoom(req, next);
  return res.status(Number(response?.status)).send(response);
};
