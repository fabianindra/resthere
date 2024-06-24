import { addTransactionController, getSalesReportController } from "@/controllers/transaction.controller";
import { Router } from "express";

const transactionRouter = Router();

transactionRouter.post('/booking', addTransactionController);
transactionRouter.get('/sales-report', getSalesReportController); 

export default transactionRouter;

