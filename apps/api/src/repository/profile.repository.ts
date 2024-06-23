import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const repoGetProfileUser = async (profile_id: number) => {
  return prisma.user.findUnique({
    where: {
      id: profile_id,
    },
  });
};

export const repoUpdateProfileUser = async ({
  profile_id,
  email,
  username,
  brithday,
  gender,
}: {
  profile_id: number;
  email: string;
  username: string;
  brithday: string;
  gender: string;
}) => {
  return prisma.user.update({
    where: {
      id: profile_id,
    },
    data: {
      username,
      email,
      brithday,
      gender,
    },
  });
};

export const repoUpdateFotoProfile = async ({
  profile_id,
  foto,
}: {
  profile_id: number;
  foto: string;
}) => {
  return prisma.user.update({
    where: {
      id: profile_id,
    },
    data: {
      foto,
    },
  });
};
