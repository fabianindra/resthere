import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getRoomAvailabilityByRoom = async (room_id: number) => {
  return prisma.roomAvailability.findMany({
    where: {
      room_id: room_id,
    },
  });
};

export const getRoomAvailabilityById = async (id: number) => {
  return prisma.roomAvailability.findUnique({
    where: {
      id: id,
    },
  });
};

export const addRoomAvailability = async ({
  room_id,
  start_date,
  end_date,
}: any) => {
  return prisma.roomAvailability.create({
    data: {
      start_date,
      end_date,
      room_id,
    },
  });
};

export const editRoomAvailability = async ({
  roomavailability_id,
  start_date,
  end_date,
}: any) => {
  //console.log(roomavailability_id);
  return prisma.roomAvailability.update({
    where: { id: roomavailability_id },
    data: {
      start_date,
      end_date,
    },
  });
};

export const deleteRoomAvailability = async (roomavailability_id: number) => {
  return prisma.roomAvailability.delete({
    where: { id: roomavailability_id },
  });
};
