import {
  serviceAddReview,
  serviceGetReviewByRoomId,
} from '../services/review.service';
import { NextFunction, Request, Response } from 'express';

export const getReviewController = async (req: Request, res: Response) => {
  const response = await serviceGetReviewByRoomId(req);
  return res.status(Number(response?.status)).send(response);
};

export const addReviewController = async (req: Request, res: Response) => {
  const response = await serviceAddReview(req);
  return res.status(Number(response?.status)).send(response);
};
