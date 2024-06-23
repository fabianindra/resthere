import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const repoAddTransaction = async (
  roomId: number,
  userId: number,
  price: number,
) => {
  try {
    // Check if the user with the given userId exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User with the given userId does not exist.');
    }

    // Check if the room with the given roomId exists
    const room = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });

    if (!room) {
      throw new Error('Room with the given roomId does not exist.');
    }

    const now: Date = new Date();
    const checkOutDate: Date = new Date(now);
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

    return { success: true, message: 'Transaction added successfully' };
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to add transaction',
      error: error.message,
    };
  }
};
