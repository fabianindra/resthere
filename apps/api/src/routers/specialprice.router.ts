import {
  addSpeialPriceController,
  deleteSpecialPrice,
  getSpecialPriceByIdController,
  getSpecialPriceByRoomController,
  updateSpecialPrice,
} from '../controllers/specialprice.controller';
import { Router } from 'express';

const specialPriceRouter = Router();

specialPriceRouter.get('/:room_id', getSpecialPriceByRoomController);
specialPriceRouter.get('/detail/:id', getSpecialPriceByIdController);
specialPriceRouter.post('/', addSpeialPriceController);
specialPriceRouter.put('/', updateSpecialPrice);
specialPriceRouter.delete('/:specialprice_id', deleteSpecialPrice);

export default specialPriceRouter;
