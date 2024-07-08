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
  page,
  sortBy = 'name',
  sortDirection = 'asc',
  startDate,
  endDate,
}: {
  property_id: string;
  search?: string;
  page: string;
  sortBy?: 'name' | 'price';
  sortDirection?: 'asc' | 'desc';
  startDate?: string;
  endDate?: string;
}) => {
  const pageN = page ? parseInt(page) * 4 - 4 : 0;

  // Parse the startDate and endDate to Date objects
  const start = startDate ? new Date(startDate) : undefined;
  const end = endDate ? new Date(endDate) : undefined;

  // Build the whereClause
  const whereClause: any = {
    property_id: parseInt(property_id),
    ...(search ? { OR: [{ name: { contains: search } }] } : {}),
    ...(start &&
      end && {
        AND: [
          {
            OR: [
              {
                room_availability: {
                  none: {
                    AND: [
                      { start_date: { lte: end } },
                      { end_date: { gte: start } },
                    ],
                  },
                },
              },
              {
                room_availability: {},
              },
            ],
          },
          {
            OR: [
              {
                transaction: {
                  none: {
                    AND: [
                      { check_out: { gte: start } },
                      { check_in: { lte: end } },
                    ],
                  },
                },
              },
              {
                transaction: {},
              },
            ],
          },
        ],
      }),
  };

  // Count the total number of matching rooms
  const countResult = await prisma.room.count({
    where: whereClause,
  });

  // Find the matching rooms
  const allRooms = await prisma.room.findMany({
    skip: pageN,
    take: 4,
    where: whereClause,
    include: {
      special_price: true,
    },
    orderBy: {
      [sortBy]: sortDirection,
    },
  });

  // Calculate the final price based on special price and weekend price
  const roomsWithPrice = allRooms.map((room) => {
    let finalPrice = room.price;

    // Get today's date
    const today = new Date();

    // Check for special price
    const specialPrice = room.special_price.find((sp) => {
      const spStart = new Date(sp.start_date);
      const spEnd = new Date(sp.end_date);
      return today >= spStart && today <= spEnd;
    });

    if (specialPrice) {
      finalPrice = specialPrice.special_price;
    } else {
      // Check for weekend price (0 for Sunday, 6 for Saturday)
      if (today.getDay() === 0 || today.getDay() === 6) {
        finalPrice = room.weekend_price;
      }
      // Else use normal price
    }

    return { ...room, finalPrice };
  });

  return {
    count: countResult,
    data: roomsWithPrice,
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
