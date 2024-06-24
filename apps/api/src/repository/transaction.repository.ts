import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const repoAddTransaction = async (roomId: any, userId: any, price: any) => {
  try {
    // Check if the user with the given userId exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User with the given userId does not exist.");
    }

    // Check if the room with the given roomId exists
    const room = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });

    if (!room) {
      throw new Error("Room with the given roomId does not exist.");
    }

    const now = new Date();
    const checkOutDate = new Date(now);
    checkOutDate.setDate(checkOutDate.getDate() + 1);

    await prisma.transaction.create({
      data: {
        room_id: roomId,
        user_id: userId,
        total_price: price,
        total_room: 1,
        check_in: now,
        check_out: checkOutDate,
      },
    });

    return { success: true, message: "Transaction added successfully" };
  } catch (error:any) {
    return { success: false, message: "Failed to add transaction", error: error.message };
  }
};

export const repoGetSalesReport = async (sortBy: string, sortDirection: string, startDate?: string, endDate?: string) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        AND: [
          startDate ? { createdAt: { gte: new Date(startDate) } } : {},
          endDate ? { createdAt: { lte: new Date(endDate) } } : {}
        ]
      },
      include: {
        room: {
          include: {
            property: true
          }
        },
        user: true
      },
      orderBy: {
        [sortBy]: sortDirection
      }
    });

    return transactions;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const repoUpdateTransactionStatus = async (transactionId: any, status: string) => {
  try {
    await prisma.transaction.update({
      where: { id: transactionId },
      data: { status },
    });
    return { success: true, message: "Transaction status updated successfully" };
  } catch (error: any) {
    return { success: false, message: "Failed to update transaction status", error: error.message };
  }
};

export const repoGetTransactionStatus = async (transactionId: any) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      select: { status: true },
    });
    if (!transaction) {
      throw new Error("Transaction not found");
    }
    return { success: true, status: transaction.status };
  } catch (error: any) {
    return { success: false, message: "Failed to get transaction status", error: error.message };
  }
};

export const repoUploadPaymentProof = async (transactionId: string, proofPath: string) => {
  try {
    await prisma.transaction.update({
      where: { id: parseInt(transactionId) },
      data: { 
        proof: proofPath,
        status: 'waiting payment confirmation',
      },
    });
    return { success: true };
  } catch (error: any) {
    throw new Error("Failed to upload payment proof: " + error.message);
  }
};
