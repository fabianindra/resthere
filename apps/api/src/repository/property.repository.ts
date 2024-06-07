import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const repoGetProperty = async () => {
  const result = await prisma.property.findMany({
    include: {
      rooms: true,
    },
  });

  result.sort((a, b) => {
    const minPriceA = Math.min(...a.rooms.map((room) => room.price));
    const minPriceB = Math.min(...b.rooms.map((room) => room.price));
    return minPriceA - minPriceB;
  });

  return result;
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