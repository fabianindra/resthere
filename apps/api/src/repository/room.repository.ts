import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const repoGetRoom = async () => {
  return await prisma.room.findMany();
};

export const repoAddRoom = async ({
  name,
  price,
  weekend_price,
  capacity_person,
  capacity_room,
  room_size,
  property_id,
}: {
  name: string;
  price: number;
  weekend_price: number;
  capacity_person: number;
  capacity_room: number;
  room_size: number;
  property_id: number;
}) => {
  return await prisma.room.create({
    data: {
      name,
      price,
      weekend_price,
      capacity_person,
      capacity_room,
      room_size,
      property_id,
    },
  });
};

export const repoUpdateRoom = async ({
  name,
  price,
  weekend_price,
  capacity_person,
  capacity_room,
  room_size,
  id,
}: {
  name: string;
  price: number;
  weekend_price: number;
  capacity_person: number;
  capacity_room: number;
  room_size: number;
  id: number;
}) => {
  return await prisma.room.update({
    where: { id },
    data: {
      name,
      price,
      weekend_price,
      capacity_person,
      capacity_room,
      room_size,
    },
  });
};

export const repoDeleteRoom = async (id: number) => {
  return await prisma.room.delete({
    where: { id },
  });
};

export const repoCheckRoom = async (id: number) => {
  return await prisma.room.findUnique({
    where: { id },
  });
};
