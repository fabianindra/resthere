import {
  addPropertyController,
  getPropertyController,
} from '../controllers/property.controller';
import { Router } from 'express';

const PropertyRouter = Router();

PropertyRouter.get('/', getPropertyController);
PropertyRouter.post('/', addPropertyController);
PropertyRouter.put('/:id', addPropertyController);

export default PropertyRouter;
