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
  birthday,
  gender,
}: {
  profile_id: number;
  email: string;
  username: string;
  birthday: string;
  gender: string;
}) => {
  return prisma.user.update({
    where: {
      id: profile_id,
    },
    data: {
      username,
      email,
      birthday,
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
  console.log(foto, 'repo');
  return prisma.user.update({
    where: {
      id: profile_id,
    },
    data: {
      foto: foto,
    },
  });
};
