import { PrismaClient } from '@prisma/client';

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

export const repoAddUser = async (username: any, email: any, password: any) => {
  await prisma.user.create({
    data: {
      username,
      email,
      password,
      verified: false,
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
      verified: false,
    },
  });
};

export const repoVerifyUser = async (email: any) => {
  await prisma.user.update({
    where: { email },
    data: { verified: true },
  });
};

export const repoVerifyTenant = async (email: any) => {
  await prisma.tenant.update({
    where: { email },
    data: { verified: true },
  });
};

export const repoUserChangePassword = async (email: any, password: any) => {
  await prisma.user.update({
    where: { email },
    data: { password: password },
  });
};

export const repoTenantChangePassword = async (email: any, password: any) => {
  await prisma.tenant.update({
    where: { email },
    data: { password: password },
  });
};
