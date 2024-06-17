import {
  serviceAddRoomAvailability,
  serviceDeleteRoomAvailability,
  serviceGetRoomAvailabilityById,
  serviceGetRoomAvailabilityByRoom,
  serviceUpdateRoomAvailability,
} from '../services/roomavailability.service';
import { NextFunction, Request, Response } from 'express';

export const getRoomAvailabilityServiceByRoomController = async (
  req: Request,
  res: Response,
) => {
  const response = await serviceGetRoomAvailabilityByRoom(req);
  return res.status(Number(response?.status)).send(response);
};

export const getRoomAvailabilityByIdController = async (
  req: Request,
  res: Response,
) => {
  const response = await serviceGetRoomAvailabilityById(req);
  return res.status(Number(response?.status)).send(response);
};

export const addRoomAvailabilityController = async (
  req: Request,
  res: Response,
) => {
  const response = await serviceAddRoomAvailability(req);
  return res.status(Number(response?.status)).send(response);
};

export const updateRoomAvailabilityController = async (
  req: Request,
  res: Response,
) => {
  const response = await serviceUpdateRoomAvailability(req);
  return res.status(Number(response?.status)).send(response);
};

export const deleteRoomAvailabilityController = async (
  req: Request,
  res: Response,
) => {
  const response = await serviceDeleteRoomAvailability(req);
  return res.status(Number(response?.status)).send(response);
};
