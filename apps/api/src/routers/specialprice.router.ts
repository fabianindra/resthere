import {
  addSpeialPriceController,
  deleteSpecialPrice,
  getDetailSpecialPriceController,
  updateSpecialPrice,
} from '../controllers/specialprice.controller';
import { Router } from 'express';

const specialPriceRouter = Router();

specialPriceRouter.get('/:room_id', getDetailSpecialPriceController);
specialPriceRouter.post('/', addSpeialPriceController);
specialPriceRouter.put('/', updateSpecialPrice);
specialPriceRouter.delete('/:specialprice_id', deleteSpecialPrice);

export default specialPriceRouter;
