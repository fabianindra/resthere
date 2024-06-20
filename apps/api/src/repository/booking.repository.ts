import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const repoGetBookings = async (user_id: number) => {
    return await prisma.transaction.findMany({
      where: {
        user_id: user_id,
      },
      include: {
        room: {
          include: {
            property: true
          }
        }
      }
    });
};
