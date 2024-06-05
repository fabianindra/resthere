import {
  addRoomController,
  checkRoomController,
  deleteRoomController,
  getRoomController,
} from '../controllers/room.controller';
import { Router } from 'express';

const roomRouter = Router();

roomRouter.get('/', getRoomController);
roomRouter.post('/', addRoomController);
roomRouter.put('/:id', checkRoomController, deleteRoomController);
roomRouter.delete('/:id', checkRoomController, deleteRoomController);

export default roomRouter;
