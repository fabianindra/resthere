import { uploader } from '../middlewares/uploder';
import {
  addRoomController,
  deleteRoomController,
  getRoomByPropertyController,
  getRoomController,
  updateRoomController,
} from '../controllers/room.controller';
import { Router } from 'express';

const roomRouter = Router();

roomRouter.get('/detail/:room_id', getRoomController);
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
  updateRoomController,
);
roomRouter.delete(
  '/:id',
  // checkRoomController,
  deleteRoomController,
);

export default roomRouter;
