import { PrismaClient } from '@prisma/client';
import NodeGeocoder from 'node-geocoder';

const prisma = new PrismaClient();

interface GetPropertyParams {
  city?: string;
  search?: string;
  page?: string;
  startDate?: string;
  endDate?: string;
}

export const buildPropertyWhereClause = ({
  city,
  search,
  startDate,
  endDate,
}: GetPropertyParams) => {
  const whereClause: any = {
    ...(city ? { city_name: city } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search } },
            { province_name: { contains: search } },
          ],
        }
      : {}),
    ...(startDate &&
      endDate && {
        rooms: {
          none: {
            OR: [
              {
                room_availability: {
                  some: {
                    AND: [
                      { start_date: { lte: new Date(endDate) } },
                      { end_date: { gte: new Date(startDate) } },
                    ],
                  },
                },
              },
              {
                transaction: {
                  some: {
                    AND: [
                      { check_out: { gte: new Date(startDate) } },
                      { check_in: { lte: new Date(endDate) } },
                    ],
                  },
                },
              },
            ],
          },
        },
      }),
  };

  return whereClause;
};

export const countProperties = async (whereClause: any) => {
  const count = await prisma.property.aggregate({
    where: whereClause,
    _count: {
      _all: true,
    },
  });
  return count._count._all;
};

export const findProperties = async (
  whereClause: any,
  skip: number,
  take: number,
) => {
  const properties = await prisma.property.findMany({
    where: whereClause,
    skip,
    take,
    include: {
      rooms: true,
    },
  });
  return properties;
};

export const sortProperties = (
  properties: any[],
  sortBy: string,
  sortDirection: string,
) => {
  return properties.sort((a, b) => {
    if (sortBy === 'price') {
      const aMinPrice = a.rooms.length
        ? Math.min(...a.rooms.map((room: any) => room.price))
        : Number.MAX_VALUE;
      const bMinPrice = b.rooms.length
        ? Math.min(...b.rooms.map((room: any) => room.price))
        : Number.MAX_VALUE;
      return sortDirection === 'asc'
        ? aMinPrice - bMinPrice
        : bMinPrice - aMinPrice;
    } else if (sortBy === 'name') {
      return sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return 0;
  });
};

export const paginateProperties = (
  properties: any[],
  page: number,
  pageSize: number,
) => {
  const startIndex = (page - 1) * pageSize;
  return properties.slice(startIndex, startIndex + pageSize);
};

export const geocoder = NodeGeocoder({
  provider: 'opencage',
  apiKey: '6a2cd4e96b9249efbd3e437027b456b2',
});