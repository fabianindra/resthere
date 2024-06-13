import { uploader } from '../middlewares/uploder';
import {
  addPropertyController,
  checkPropertyController,
  deletePropertyController,
  getPropertyControllerById,
  getPropertyControllerByRooms,
  getPropertyControllerByTenant,
  updtePropertyController,
} from '../controllers/property.controller';
import { Router } from 'express';

const propertyRouter = Router();

propertyRouter.get('/', getPropertyControllerByRooms);
propertyRouter.get('/:tenant_id', getPropertyControllerByTenant);
propertyRouter.get('/detail/:property_id', getPropertyControllerById);

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
