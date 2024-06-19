import { serviceGetBookings } from '@/services/booking.services';
import { NextFunction, Request, Response } from 'express';

export const getBookingsController = async (req: Request, res: Response) => {
    const response = await serviceGetBookings(req);
    return res.status(Number(response?.status)).send(response);
  };
  