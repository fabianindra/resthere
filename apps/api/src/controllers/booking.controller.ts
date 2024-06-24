import {
  serviceGetBookings,
  serviceGetBookingsTenant,
} from '../services/booking.services';
import { NextFunction, Request, Response } from 'express';

export const getBookingsController = async (req: Request, res: Response) => {
  const response = await serviceGetBookings(req);
  return res.status(Number(response?.status)).send(response);
};

export const getBookingsTenantController = async (
  req: Request,
  res: Response,
) => {
  const response = await serviceGetBookingsTenant(req);
  return res.status(Number(response?.status)).send(response);
};
