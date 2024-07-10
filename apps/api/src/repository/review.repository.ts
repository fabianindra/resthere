import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const repoAddReview = async (
  property_id: number,
  star: number,
  feed_back: string,
) => {
  return await prisma.review.create({
    data: {
      property_id,
      star,
      feed_back,
    },
  });
};

export const repoGetReviewByRoomId = async (property_id: number) => {
  return await prisma.review.findMany({
    where: {
      property_id,
    },
  });
};
