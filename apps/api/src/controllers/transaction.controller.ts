import { NextFunction, Request, Response } from 'express';
import { serviceAddTransaction, serviceGetSalesReport } from "@/services/transaction.services";

export const addTransactionController = async (req: Request, res: Response) => {
    const response = await serviceAddTransaction(req);
    return res.status(Number(response?.status)).send(response);
  };

export const getSalesReportController = async (req: Request, res: Response) => {
  const response = await serviceGetSalesReport(req);
  return res.status(Number(response?.status)).send(response);
};
  