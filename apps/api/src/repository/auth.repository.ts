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

export const repoAddUser = async (email: any) => {
  await prisma.user.create({ 
    data: {
      username: email,
      email,
      password: email,
      verified: false,
    },
  });
};

export const repoAddTenant = async (email: any) => {
  await prisma.tenant.create({
    data: {
      username: email,
      email,
      password: email,
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

export const repoUserCompletePassword = async (email: any, username: any, password: any) => {
  await prisma.user.update({
    where: { email },
    data: { username: username, password: password },
  });
}

export const repoTenantChangePassword = async (email: any, password: any) => {
  await prisma.tenant.update({
    where: { email },
    data: { password: password },
  });
};

export const repoTenantCompletePassword = async (email: any, username: any, password: any) => {
  await prisma.tenant.update({
    where: { email },
    data: { username: username, password: password },
  });
};
