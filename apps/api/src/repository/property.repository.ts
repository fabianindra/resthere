import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const repoGetProperty = async () => {
  return await prisma.property.findMany();
};

export const repoAddProperty = async ({
  name,
  address,
  category_property,
  tenant_id,
}: {
  name: string;
  address: string;
  category_property: string;
  tenant_id: number;
}) => {
  return await prisma.property.create({
    data: {
      name,
      address,
      category_property,
      room_count: 0,
      tenant_id,
    },
  });
};

export const repoUpdateProperty = async ({
  id,
  name,
  address,
  category_property,
}: {
  id: number;
  name: string;
  address: string;
  category_property: string;
}) => {
  return await prisma.property.update({
    where: { id },
    data: {
      name,
      address,
      category_property,
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
