import { getBookingsController } from "@/controllers/booking.controller";
import { Router } from "express";

const bookingRouter = Router();

bookingRouter.get('/all-booking/:user_id', getBookingsController);

export default bookingRouter;

