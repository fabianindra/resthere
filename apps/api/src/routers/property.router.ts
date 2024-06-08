import { uploader } from '../middlewares/uploder';
import {
  addPropertyController,
  checkPropertyController,
  deletePropertyController,
  getPropertyControllerByRooms,
  updtePropertyController,
} from '../controllers/property.controller';
import { Router } from 'express';

const propertyRouter = Router();

propertyRouter.get('/', getPropertyControllerByRooms);
propertyRouter.post(
  '/',
  uploader('IMG', '/images').single('file'),
  addPropertyController,
);
propertyRouter.put(
  '/:id',
  checkPropertyController,
  uploader('IMG', '/images').single('file'),
  updtePropertyController,
);
propertyRouter.delete(
  '/:id',
  checkPropertyController,
  deletePropertyController,
);

export default propertyRouter;
