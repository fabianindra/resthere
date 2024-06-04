import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const repoFindUser = async (email: any) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const repoFindTenant = async (email: any) => {
  return await prisma.tenant.findUnique({
    where: { email },
  });
};

export const repoAddUser = async (
  username: any,
  email: any,
  password: any,
) => {
  await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
};

export const repoAddTenant = async (
  username: any,
  email: any,
  password: any,
) => {
  await prisma.tenant.create({
    data: {
      username,
      email,
      password,
    },
  });
};
