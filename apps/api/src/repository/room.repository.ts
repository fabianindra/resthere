import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const repoGetRoom = async (id: number) => {
  return await prisma.room.findUnique({
    where: {
      id: id,
    },
    include: {
      special_price: true,
      room_availability: true,
    },
  });
};

export const repoGetRoomByProperty = async ({
  property_id,
  search,
  category,
  page,
  sortBy,
  sortDirection,
}: {
  property_id: string;
  search: string;
  category: string;
  page: string;
  sortBy: 'name' | 'price';
  sortDirection: 'asc' | 'desc';
}) => {
  const pageN = page ? parseInt(page) * 4 - 4 : 0;

  const whereClause = {
    property_id: parseInt(property_id),
    ...(category ? { category_property: category } : {}),
    ...(search ? { OR: [{ name: { contains: search } }] } : {}),
  };
  const count = await prisma.room.aggregate({
    where: whereClause,
    _count: {
      _all: true,
    },
  });

  sortBy ? sortBy : (sortBy = 'name');

  const allRooms = await prisma.room.findMany({
    skip: pageN,
    take: 4,
    where: whereClause,
    orderBy: [
      {
        [sortBy]: sortDirection,
      },
    ],
  });

  return {
    count,
    data: allRooms,
  };
};

export const repoGetRoomSpecialPrice = async (id_room: number) => {
  return prisma.room.findUnique({
    where: {
      id: id_room,
    },
    include: {
      special_price: true,
    },
  });
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
}: {
  name: string;
  price: number;
  weekend_price: number;
  capacity_person: number;
  capacity_room: number;
  room_size: string;
  property_id: number;
  image: string;
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
      image,
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
  image,
}: {
  name: string;
  price: number;
  weekend_price: number;
  capacity_person: number;
  capacity_room: number;
  room_size: string;
  id: number;
  image: string;
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
      image,
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
