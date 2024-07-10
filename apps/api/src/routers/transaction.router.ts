import {
  addTransactionController,
  getPaymentProofController,
  getSalesReportController,
  getTransactionStatusController,
  updateTransactionApproveController,
  updateTransactionStatusController,
  uploadPaymentProofController,
} from '../controllers/transaction.controller';
import { Router } from 'express';
import { uploader } from '../middlewares/uploder';

const transactionRouter = Router();

transactionRouter.post('/booking', addTransactionController);
transactionRouter.get('/sales-report', getSalesReportController);
transactionRouter.post('/update-status', updateTransactionStatusController);
transactionRouter.post('/approve', updateTransactionApproveController);
transactionRouter.get('/status', getTransactionStatusController);
transactionRouter.get('/payment-proof/:bookingId', getPaymentProofController);
transactionRouter.post(
  '/upload-payment-proof',
  uploader('IMG', '/images').single('paymentProof'),
  uploadPaymentProofController,
);

export default transactionRouter;
