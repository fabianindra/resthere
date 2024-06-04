import { repoGetProperty } from '@/repository/property.repository';

export const serviceGetALLProperty = async () => {
  try {
    const data = await repoGetProperty();
    console.log(data);
    return {
      status: 200,
      success: true,
      message: 'Get data success',
      data: data,
    };
  } catch (error) {
    throw new Error('Failed to get books');
  }
};
