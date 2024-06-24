import { repoAddTransaction, repoGetSalesReport } from "@/repository/transaction.repository";

export const serviceAddTransaction = async (req: any) => {
  const {
    roomId,
    userId,
    price
  } = req.body;
  
  if (!roomId || !userId || !price) {
    return {
      status: 401,
      success: true,
      message: 'invalid input',
    };
  }

  try {
    const data = await repoAddTransaction(roomId, userId, price);
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
    const transactions = await repoGetSalesReport(sortBy || 'createdAt', sortDirection || 'asc', startDate, endDate);
    return {
      status: 200,
      success: true,
      data: transactions
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Server error',
      error: (error as Error).message
    };
  }
};