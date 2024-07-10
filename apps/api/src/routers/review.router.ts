import {
  addReviewController,
  getReviewController,
} from '../controllers/review.controller';
import { Router } from 'express';

const reviewRouter = Router();

reviewRouter.get('/:property_id', getReviewController);
reviewRouter.post('/', addReviewController);

export default reviewRouter;
