import {
  addPropertyController,
  checkPropertyController,
  deletePropertyController,
  getPropertyController,
  updtePropertyController,
} from '../controllers/property.controller';
import { Router } from 'express';

const propertyRouter = Router();

propertyRouter.get('/', getPropertyController);
propertyRouter.post('/', addPropertyController);
propertyRouter.put('/:id', checkPropertyController, updtePropertyController);
propertyRouter.delete(
  '/:id',
  checkPropertyController,
  deletePropertyController,
);

export default propertyRouter;
