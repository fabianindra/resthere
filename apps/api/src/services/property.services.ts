import {
  repoAddProperty,
  repoCheckProperty,
  repoDeleteProperty,
  repoGetDetailProperty,
  repoGetPropertyByRooms,
  repoGetPropertyByTenant,
  repoUpdateProperty,
} from '../repository/property.repository';

export const serviceGetPropertyByRooms = async (req: any) => {
  const { city, search, page, sortBy, sortDirection, startDate, endDate } =
    req.query;
  try {
    const data = await repoGetPropertyByRooms({
      city,
      search,
      page,
      sortBy,
      sortDirection,
      startDate,
      endDate,
    });
    return {
      status: 200,
      success: true,
      message: 'Get data success',
      data: data.result,
      count: data.count,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    };
  }
};

export const serviceGetPropertyByTenant = async (req: any) => {
  const { tenant_id } = req.params;
  const { search, category, page, sortBy, sortDirection, startDate, endDate } =
    req.query;
  try {
    const data = await repoGetPropertyByTenant({
      tenant_id,
      search,
      category,
      page,
      sortBy,
      sortDirection,
      startDate,
      endDate,
    });
    return {
      status: 200,
      success: true,
      message: 'Get data success',
      data: data.result,
      count: data.count,
    };
  } catch (error) {
    //console.log(error);
    return {
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    };
  }
};

export const serviceGetPropertyById = async (req: any) => {
  const { property_id } = req.params;
  try {
    const data = await repoGetDetailProperty(parseInt(property_id));
    return {
      status: 200,
      success: true,
      message: 'Get data success',
      data: data,
    };
  } catch (error) {
    //console.log(error);
    return {
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    };
  }
};

export const serviceAddProperty = async (req: any) => {
  const {
    name,
    address,
    city_name,
    province_name,
    category_property,
    tenant_id,
  } = req.body;
  const { file } = req;
  if (
    !name ||
    !address ||
    !city_name ||
    !province_name ||
    !category_property ||
    !tenant_id ||
    !file
  ) {
    return {
      status: 401,
      success: true,
      message: 'invalid input',
    };
  }
  try {
    const data = await repoAddProperty({
      name,
      address,
      city_name,
      province_name,
      category_property,
      tenant_id: parseInt(tenant_id),
      image: file.filename,
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
  const { file } = req;
  if (!name && !address && !category_property && !file) {
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
      image: file?.filename,
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
    const id = req.params.id
      ? parseInt(req.params.id)
      : parseInt(req.body.property_id);

    if (isNaN(id)) {
      return {
        status: 400,
        success: false,
        message: 'Invalid property ID',
      };
    }

    const data = await repoCheckProperty(id);
    //console.log(id, 'INI ID');

    if (!data) {
      return {
        status: 404,
        success: false,
        message: 'Property not found',
      };
    }

    next();
  } catch (error) {
    console.error('Error in serviceCheckProperty:', error);
    return {
      status: 500,
      message: 'Server error',
      error: (error as Error).message,
    };
  }
};
