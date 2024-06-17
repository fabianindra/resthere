import {
  addRoomAvailabilityController,
  deleteRoomAvailabilityController,
  getRoomAvailabilityByIdController,
  getRoomAvailabilityServiceByRoomController,
  updateRoomAvailabilityController,
} from '../controllers/roomavailability.controller';
import { Router } from 'express';

const roomAvailability = Router();

roomAvailability.get('/:room_id', getRoomAvailabilityServiceByRoomController);
roomAvailability.get('/detail/:id', getRoomAvailabilityByIdController);
roomAvailability.post('/', addRoomAvailabilityController);
roomAvailability.put('/', updateRoomAvailabilityController);
roomAvailability.delete(
  '/:roomavailability_id',
  deleteRoomAvailabilityController,
);

export default roomAvailability;
