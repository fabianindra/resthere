import {
  repoAddProperty,
  repoDeleteProperty,
  repoGetProperty,
  repoUpdateProperty,
} from '@/repository/property.repository';

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

export const serviceAddProperty = async (req: any) => {
  const { name, address, category_property, room_count, tenant_id }: any =
    req.body;
  try {
    const data = await repoAddProperty({
      name,
      address,
      category_property,
      room_count,
      tenant_id,
    });
    return {
      status: 201,
      success: true,
      message: 'add property successfully',
      data: { data },
    };
  } catch (error) {
    throw new Error('Failed to get books');
  }
};

export const serviceUpdateProperty = async (req: any) => {
  const { name, address, category_property, room_count, tenant_id }: any =
    req.body;
  try {
    const data = await repoUpdateProperty({
      id: parseInt(req.params.id),
      name,
      address,
      category_property,
      room_count,
      tenant_id,
    });
    return {
      status: 201,
      success: true,
      message: 'update property successfully',
      data: { data },
    };
  } catch (error) {
    throw new Error('Failed to get books');
  }
};

export const serviceDeleteProperty = async (req: any) => {
  try {
    const data = await repoDeleteProperty({
      id: parseInt(req.params.id),
    });
    return {
      status: 201,
      success: true,
      message: 'delete property successfully',
      data: { data },
    };
  } catch (error) {
    throw new Error('Failed to get books');
  }
};
