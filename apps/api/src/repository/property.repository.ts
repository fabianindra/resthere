import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const repoGetProperty = async () => {
  return await prisma.property.findMany();
};
