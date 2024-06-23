import { addTransactionController } from "@/controllers/transaction.controller";
import { Router } from "express";

const transactionRouter = Router();

transactionRouter.post('/booking', addTransactionController);

export default transactionRouter;

