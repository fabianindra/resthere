import {
  repoAddProperty,
  repoCheckProperty,
  repoDeleteProperty,
  repoGetProperty,
  repoUpdateProperty,
} from '../repository/property.repository';

export const serviceGetALLProperty = async () => {
  try {
    const data = await repoGetProperty();
    return {
      status: 200,
      success: true,
      message: 'Get data success',
      data: data,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    };
  }
};

export const serviceAddProperty = async (req: any) => {
  const { name, address, category_property, tenant_id }: any = req.body;
  try {
    if (!name || !address || !category_property || !tenant_id) {
      return {
        status: 401,
        success: true,
        message: 'invalid input',
      };
    }
    const data = await repoAddProperty({
      name,
      address,
      category_property,
      tenant_id,
    });
    return {
      status: 201,
      success: true,
      message: 'add property successfully',
      data: { data },
    };
  } catch (error) {
    return {
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    };
  }
};

export const serviceUpdateProperty = async (req: any) => {
  const { name, address, category_property }: any = req.body;
  if (!name || !address || !category_property) {
    return {
      status: 401,
      success: true,
      message: 'invalid input',
    };
  }
  try {
    const data = await repoUpdateProperty({
      id: parseInt(req.params.id),
      name,
      address,
      category_property,
    });
    return {
      status: 201,
      success: true,
      message: 'update property successfully',
      data: { data },
    };
  } catch (error) {
    return {
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    };
  }
};

export const serviceDeleteProperty = async (req: any) => {
  try {
    const data = await repoDeleteProperty(parseInt(req.params.id));
    return {
      status: 201,
      success: true,
      message: 'delete property successfully',
      data: { data },
    };
  } catch (error) {
    return {
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    };
  }
};

export const serviceCheckProperty = async (req: any, next: any) => {
  try {
    const data = await repoCheckProperty(parseInt(req.params.id));
    if (!data) {
      return {
        status: 401,
        success: true,
        message: 'invalid input',
      };
    }
    next();
  } catch (error) {
    return {
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    };
  }
};
