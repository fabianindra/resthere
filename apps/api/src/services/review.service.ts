import {
  repoAddReview,
  repoGetReviewByRoomId,
} from '../repository/review.repository';

export const serviceAddReview = async (req: any) => {
  const { property_id, star, feed_back } = req.body;
  try {
    const data = await repoAddReview(property_id, star, feed_back);
    return {
      status: 201,
      success: true,
      message: 'add review successfully',
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      success: false,
      message: 'add review failled',
      error: (error as Error).message,
    };
  }
};

export const serviceGetReviewByRoomId = async (req: any) => {
  const { property_id } = req.params;
  console.log(property_id);
  try {
    const data = await repoGetReviewByRoomId(parseInt(property_id));
    return {
      status: 200,
      success: true,
      message: 'get review successfully',
      data,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: 'get review failled',
      error: (error as Error).message,
    };
  }
};
