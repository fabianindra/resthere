import { NextFunction, Request, Response } from 'express';
import {
  serviceAddTransaction,
  serviceGetPaymentProof,
  serviceGetSalesReport,
  serviceGetTransactionStatus,
  serviceTransactionApprove,
  serviceUpdateTransactionStatus,
  serviceUploadPaymentProof,
} from '../services/transaction.services';

export const addTransactionController = async (req: Request, res: Response) => {
  const response = await serviceAddTransaction(req);
  return res.status(Number(response?.status)).send(response);
};

export const getSalesReportController = async (req: Request, res: Response) => {
  const response = await serviceGetSalesReport(req);
  return res.status(Number(response?.status)).send(response);
};

export const getPaymentProofController = async (req: Request, res: Response) => {
  const response = await serviceGetPaymentProof(req);
  return res.status(Number(response?.status)).send(response);
};

export const updateTransactionStatusController = async (
  req: Request,
  res: Response,
) => {
  const response = await serviceUpdateTransactionStatus(req);
  return res.status(Number(response?.status)).send(response);
};

export const updateTransactionApproveController = async (
  req: Request,
  res: Response,
) => {
  const response = await serviceTransactionApprove(req);
  return res.status(Number(response?.status)).send(response);
};

export const getTransactionStatusController = async (
  req: Request,
  res: Response,
) => {
  const response = await serviceGetTransactionStatus(req);
  return res.status(Number(response?.status)).send(response);
};

export const uploadPaymentProofController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await serviceUploadPaymentProof(req as any);
    return res.status(response.status).send(response);
  } catch (error) {
    return next(error);
  }
};
