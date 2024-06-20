import { NextFunction, Request, Response } from 'express';
import { serviceAddTransaction } from "@/services/transaction.services";

export const addTransactionController = async (req: Request, res: Response) => {
    const response = await serviceAddTransaction(req);
    return res.status(Number(response?.status)).send(response);
  };
  