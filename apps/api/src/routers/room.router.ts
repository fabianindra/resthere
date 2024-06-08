import { uploader } from '../middlewares/uploder';
import { checkPropertyController } from '../controllers/property.controller';
import {
  addRoomController,
  checkRoomController,
  deleteRoomController,
  getRoomByPropertyController,
  getRoomController,
} from '../controllers/room.controller';
import { Router } from 'express';

const roomRouter = Router();

roomRouter.get('/', getRoomController);
roomRouter.get('/:property_id', getRoomByPropertyController);
roomRouter.post(
  '/',
  // checkPropertyController,
  uploader('IMG', '/images').single('file'),
  addRoomController,
);

roomRouter.put(
  '/:id',
  // checkRoomController,
  uploader('IMG', '/images').single('file'),
  deleteRoomController,
);
roomRouter.delete('/:id', checkRoomController, deleteRoomController);

export default roomRouter;
