import {
  addReviewController,
  getReviewController,
} from '../controllers/review.controller';
import { Router } from 'express';

const reviewRouter = Router();

reviewRouter.get('/', getReviewController);
reviewRouter.post('/', addReviewController);

export default reviewRouter;
