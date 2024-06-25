import {
  getBookingsController,
  getBookingsTenantController,
} from '../controllers/booking.controller';
import { Router } from 'express';

const bookingRouter = Router();

bookingRouter.get('/all-booking/:user_id', getBookingsController);
bookingRouter.get(
  '/all-booking-tenant/:tenant_id',
  getBookingsTenantController,
);

export default bookingRouter;
