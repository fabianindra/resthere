import { PrismaClient } from '@prisma/client';
import { calculateFinalPrice, buildWhereClause } from '../utils/room.utils';

const prisma = new PrismaClient();

type RoomParams = {
  id: number;
  startDate?: string;
  endDate?: string;
};

export const repoGetRoom = async ({ id, startDate, endDate }: RoomParams) => {
  const room = await prisma.room.findUnique({
    where: { id },
    include: { special_price: true, room_availability: true },
  });

  if (!room) {
    throw new Error('Room not found');
  }

  const finalPrice = await calculateFinalPrice(room, startDate, endDate);

  return { ...room, finalPrice };
};

type RoomByPropertyParams = {
  property_id: string;
  search?: string;
  page?: string;
  sortBy?: 'name' | 'price';
  sortDirection?: 'asc' | 'desc';
  startDate?: string;
  endDate?: string;
};

export const repoGetRoomByProperty = async ({
  property_id,
  search,
  page,
  sortBy = 'name',
  sortDirection = 'asc',
  startDate,
  endDate,
}: RoomByPropertyParams) => {
  const pageN = page ? parseInt(page) * 4 - 4 : 0;

  const whereClause = await buildWhereClause(
    property_id,
    search,
    startDate,
    endDate,
  );

  const countResult = await prisma.room.count({ where: whereClause });

  const allRooms = await prisma.room.findMany({
    skip: pageN,
    take: 4,
    where: whereClause,
    include: { special_price: true },
    orderBy: { [sortBy]: sortDirection },
  });

  const roomsWithPrice = await Promise.all(
    allRooms.map(async (room) => {
      const finalPrice = await calculateFinalPrice(room, startDate, endDate);
      return { ...room, finalPrice };
    }),
  );

  return { count: countResult, data: roomsWithPrice };
};

export const repoGetRoomSpecialPrice = async (id_room: number) => {
  return prisma.room.findUnique({
    where: { id: id_room },
    include: { special_price: true },
  });
};

type AddRoomParams = {
  name: string;
  price: number;
  weekend_price: number;
  capacity_person: number;
  capacity_room: number;
  room_size: string;
  property_id: number;
  image: string;
};

export const repoAddRoom = async ({
  name,
  price,
  weekend_price,
  capacity_person,
  capacity_room,
  room_size,
  property_id,
  image,
}: AddRoomParams) => {
  return await prisma.room.create({
    data: {
      name,
      price,
      weekend_price,
      capacity_person,
      capacity_room,
      room_size,
      property_id,
      image,
    },
  });
};

type UpdateRoomParams = {
  name: string;
  price: number;
  weekend_price: number;
  capacity_person: number;
  capacity_room: number;
  room_size: string;
  id: number;
  image: string;
};

export const repoUpdateRoom = async ({
  name,
  price,
  weekend_price,
  capacity_person,
  capacity_room,
  room_size,
  id,
  image,
}: UpdateRoomParams) => {
  return await prisma.room.update({
    where: { id },
    data: {
      name,
      price,
      weekend_price,
      capacity_person,
      capacity_room,
      room_size,
      image,
    },
  });
};

export const repoDeleteRoom = async (id: number) => {
  return await prisma.room.delete({ where: { id } });
};

export const repoCheckRoom = async (id: number) => {
  return await prisma.room.findUnique({ where: { id } });
};
