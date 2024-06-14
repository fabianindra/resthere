import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDetailSpecialPrice = async (room_id: number) => {
  return prisma.specialPrice.findUnique({
    where: {
      id: room_id,
    },
  });
};

export const addSpecialPrice = async ({
  room_id,
  start_date,
  end_date,
  special_price,
}: any) => {
  return prisma.specialPrice.create({
    data: {
      start_date,
      end_date,
      special_price,
      room_id,
    },
  });
};

export const editSpecialPrice = async ({
  specialprice_id,
  start_date,
  end_date,
  special_price,
}: any) => {
  return prisma.specialPrice.update({
    where: { id: specialprice_id },
    data: {
      start_date,
      end_date,
      special_price,
    },
  });
};

export const deleteSpecialRoom = async (specialprice_id: number) => {
  return prisma.specialPrice.delete({
    where: { id: specialprice_id },
  });
};
