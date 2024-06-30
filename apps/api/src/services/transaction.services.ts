import { transporter } from './../helpers/nodemailer';
import {
  repoAddTransaction,
  repoGetPaymentProof,
  repoGetSalesReport,
  repoGetTransactionStatus,
  repoUpdateTransactionStatus,
  repoUploadPaymentProof,
} from '../repository/transaction.repository';
import path from 'path';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

interface PaymentProofRequestBody {
  transactionId: string;
}

export const serviceAddTransaction = async (req: any) => {
  const { roomId, userId, price, startDate, endDate } = req.body;

  if (!roomId || !userId || !price) {
    return {
      status: 401,
      success: true,
      message: 'invalid input',
    };
  }

  try {
    const data = await repoAddTransaction(
      roomId,
      userId,
      price,
      startDate,
      endDate,
    );
    return {
      status: 201,
      success: true,
      message: 'add transaction successfully',
      data: { data },
    };
  } catch (error) {
    return {
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    };
  }
};

export const serviceGetSalesReport = async (req: any) => {
  const { sortBy, sortDirection, startDate, endDate } = req.query;

  try {
    const transactions = await repoGetSalesReport(
      sortBy || 'createdAt',
      sortDirection || 'asc',
      startDate,
      endDate,
    );
    return {
      status: 200,
      success: true,
      data: transactions,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Server error',
      error: (error as Error).message,
    };
  }
};

export const serviceUpdateTransactionStatus = async (req: any) => {
  const { transactionId, status } = req.body;

  if (!transactionId || !status) {
    return {
      status: 401,
      success: false,
      message: 'Invalid input',
    };
  }

  try {
    const data = await repoUpdateTransactionStatus(transactionId, status);
    return {
      status: 200,
      success: true,
      message: 'Transaction status updated successfully',
      data: { data },
    };
  } catch (error: any) {
    return {
      status: 500,
      message: 'Server error',
      error: error.message,
    };
  }
};

export const serviceTransactionApprove = async (req: any) => {
  const { transactionId, email, text } = req.body;

  if (!transactionId) {
    return {
      status: 401,
      success: false,
      message: 'Invalid input',
    };
  }

  try {
    const data = await repoUpdateTransactionStatus(transactionId, 'approved');
    await transporter.sendMail({
      subject: 'sender - confirmation',
      text: `${text}`,
      to: email,
      from: 'Josh',
    });
    return {
      status: 200,
      success: true,
      message: 'Transaction status updated successfully',
      data: { data },
    };
  } catch (error: any) {
    return {
      status: 500,
      message: 'Server error',
      error: error.message,
    };
  }
};

export const serviceGetTransactionStatus = async (req: any) => {
  const { transactionId } = req.query;

  if (!transactionId) {
    return {
      status: 401,
      success: false,
      message: 'Invalid input',
    };
  }

  try {
    const data = await repoGetTransactionStatus(transactionId);
    return {
      status: 200,
      success: true,
      data: { status: data.status },
    };
  } catch (error: any) {
    return {
      status: 500,
      message: 'Server error',
      error: error.message,
    };
  }
};

export const serviceUploadPaymentProof = async (req: Request) => {
  const body = req.body;

  if (!body || typeof body !== 'object' || !('transactionId' in body)) {
    return {
      status: 400,
      success: false,
      message: 'Transaction ID is required in the request body.',
    };
  }

  const { transactionId } = body as PaymentProofRequestBody;
  const file = (req as any).file;

  if (!file) {
    return {
      status: 400,
      success: false,
      message: 'File is required in the request.',
    };
  }

  try {
    const filePath = path.join('/images', file.filename);
    const data = await repoUploadPaymentProof(transactionId, filePath);

    await repoUpdateTransactionStatus(
      transactionId,
      'waiting payment confirmation',
    );

    return {
      status: 200,
      success: true,
      message: 'Payment proof uploaded successfully',
      data,
    };
  } catch (error: any) {
    return {
      status: 500,
      success: false,
      message: 'Server error',
      error: error.message,
    };
  }
};

export const serviceGetPaymentProof = async (req: any) => {
  const transactionId = req.params.bookingId;

  if (!transactionId) {
    return {
      status: 401,
      success: false,
      message: 'Invalid input',
    };
  }

  try {
    const data = await repoGetPaymentProof(transactionId);
    return {
      status: 200,
      success: true,
      data: data,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: 'Server error',
      error: error.message,
    };
  }
};
