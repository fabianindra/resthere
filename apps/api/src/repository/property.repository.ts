import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface GetPropertyParams {
  city?: string;
  search?: string;
  page?: string;
}

export const repoGetPropertyByRooms = async ({
  city,
  search,
  page,
}: GetPropertyParams) => {
  const pageN = page ? parseInt(page) * 4 - 4 : 0;

  const whereClause = {
    ...(city ? { city_name: city } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search } },
            { province_name: { contains: search } },
          ],
        }
      : {}),
    rooms: {
      some: {},
    },
  };

  const count = await prisma.property.aggregate({
    where: whereClause,
    _count: {
      _all: true,
    },
  });

  const result = await prisma.property.findMany({
    where: whereClause,
    skip: pageN,
    take: 4,
    include: {
      rooms: true,
    },
  });

  result.sort((a, b) => {
    const minPriceA = Math.min(...a.rooms.map((room) => room.price));
    const minPriceB = Math.min(...b.rooms.map((room) => room.price));
    return minPriceA - minPriceB;
  });

  return {
    count: count._count._all,
    result,
  };
};

export const repoGetPropertyByTenant = async ({
  tenant_id,
  search,
  category,
  page,
  sortBy,
  sortDirection,
}: {
  tenant_id: string;
  search: string;
  category: string;
  page: string;
  sortBy: 'name' | 'price';
  sortDirection: 'asc' | 'desc';
}) => {
  const pageN = page ? parseInt(page) * 4 - 4 : 0;

  const whereClause = {
    tenant_id: parseInt(tenant_id),
    ...(category ? { category_property: category } : {}),
    ...(search ? { OR: [{ name: { contains: search } }] } : {}),
  };

  const count = await prisma.property.aggregate({
    where: whereClause,
    _count: {
      _all: true,
    },
  });

  const properties = await prisma.property.findMany({
    where: whereClause,
    skip: pageN,
    take: 4,
    include: {
      rooms: true,
    },
  });

  const sortedProperties = properties.sort((a, b) => {
    if (sortBy === 'price') {
      const aMinPrice = a.rooms.length
        ? Math.min(...a.rooms.map((room) => room.price))
        : Number.MAX_VALUE;
      const bMinPrice = b.rooms.length
        ? Math.min(...b.rooms.map((room) => room.price))
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

  return {
    count: count._count._all,
    result: sortedProperties,
  };
};

export const repoAddProperty = async ({
  name,
  address,
  city_name,
  province_name,
  category_property,
  tenant_id,
  image,
}: {
  name: string;
  address: string;
  city_name: string;
  province_name: string;
  category_property: string;
  tenant_id: number;
  image: string;
}) => {
  return await prisma.property.create({
    data: {
      name,
      address,
      city_name,
      province_name,
      category_property,
      room_count: 0,
      tenant_id,
      image,
    },
  });
};

export const repoUpdateProperty = async ({
  id,
  name,
  address,
  category_property,
  image,
}: {
  id: number;
  name: string;
  address: string;
  category_property: string;
  image: string;
}) => {
  return await prisma.property.update({
    where: { id },
    data: {
      name,
      address,
      category_property,
      image,
    },
  });
};

export const repoDeleteProperty = async (id: number) => {
  return await prisma.property.delete({
    where: { id },
  });
};

export const repoCheckProperty = async (id: number) => {
  return await prisma.property.findUnique({
    where: { id },
  });
};
