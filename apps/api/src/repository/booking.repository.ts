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

export const repoGetBookingsTenant = async (tenant_id: number) => {
  return await prisma.transaction.findMany({
    where: {
      room: {
        property: {
          tenant_id: tenant_id,
        },
      },
    },
    include: {
      room: {
        include: {
          property: true,
        },
      },
      user: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  });
};
