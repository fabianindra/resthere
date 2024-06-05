import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const repoGetProperty = async () => {
  return await prisma.property.findMany();
};

export const repoAddProperty = async ({
  name,
  address,
  category_property,
  room_count,
  tenant_id,
}: {
  name: string;
  address: string;
  category_property: string;
  room_count: number;
  tenant_id: number;
}) => {
  return await prisma.property.create({
    data: {
      name,
      address,
      category_property,
      room_count,
      tenant_id,
    },
  });
};

export const repoUpdateProperty = async ({
  id,
  name,
  address,
  category_property,
  room_count,
  tenant_id,
}: {
  id: number;
  name: string;
  address: string;
  category_property: string;
  room_count: number;
  tenant_id: number;
}) => {
  return await prisma.property.update({
    where: { id },
    data: {
      name,
      address,
      category_property,
      room_count,
      tenant_id,
    },
  });
};

export const repoDeleteProperty = async ({ id }: { id: number }) => {
  return await prisma.property.delete({
    where: { id },
  });
};
