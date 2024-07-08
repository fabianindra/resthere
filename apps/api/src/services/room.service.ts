import {
  repoAddRoom,
  repoCheckRoom,
  repoDeleteRoom,
  repoGetRoom,
  repoGetRoomByProperty,
  repoUpdateRoom,
} from '../repository/room.repository';

export const serviceGetALLRoom = async (req: any) => {
  const { room_id } = req.params;
  try {
    const data = await repoGetRoom(parseInt(room_id));
    return {
      status: 200,
      success: true,
      message: 'get all rooms successfully',
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

export const serviceGetRoomByProperty = async (req: any) => {
  const { property_id } = req.params;
  const { search, page, sortBy, sortDirection, startDate, endDate } = req.query;
  try {
    const data = await repoGetRoomByProperty({
      property_id,
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
      message: 'get all rooms property successfully',
      data: data.data,
      count: data.count,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    };
  }
};

export const serviceAddRoom = async (req: any) => {
  const {
    name,
    price,
    weekend_price,
    capacity_person,
    capacity_room,
    room_size,
    property_id,
  } = req.body;
  const { file } = req;
  if (
    !name ||
    !price ||
    !weekend_price ||
    !capacity_person ||
    !capacity_room ||
    !room_size ||
    !property_id ||
    !file
  ) {
    return {
      status: 401,
      success: true,
      message: 'invalid input room',
    };
  }
  try {
    const data = await repoAddRoom({
      name,
      price: parseInt(price),
      weekend_price: parseInt(weekend_price),
      capacity_person: parseInt(capacity_person),
      capacity_room: parseInt(capacity_room),
      room_size: room_size,
      property_id: parseInt(property_id),
      image: file.filename,
    });
    return {
      status: 201,
      success: true,
      message: 'add rooms successfully',
      data: data,
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

export const serviceUpdateRoom = async (req: any) => {
  const {
    name,
    price,
    weekend_price,
    capacity_person,
    capacity_room,
    room_size,
  } = req.body;
  const { file } = req;
  if (
    !name &&
    !price &&
    !weekend_price &&
    !capacity_person &&
    !capacity_room &&
    !room_size &&
    !file
  ) {
    return {
      status: 401,
      success: true,
      message: 'invalid input',
    };
  }

  try {
    const data = await repoUpdateRoom({
      name,
      price: parseInt(price),
      weekend_price: parseInt(weekend_price),
      capacity_person: parseInt(capacity_person),
      capacity_room: parseInt(capacity_room),
      room_size,
      id: parseInt(req.params.id),
      image: file?.filename,
    });
    return {
      status: 201,
      success: true,
      message: 'update rooms successfully',
      data: data,
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

export const serviceDeleteRoom = async (req: any) => {
  try {
    const data = await repoDeleteRoom(parseInt(req.params.id));
    return {
      status: 201,
      success: true,
      message: 'delete all rooms successfully',
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

export const serviceCheckRoom = async (req: any, next: any) => {
  try {
    const data = await repoCheckRoom(parseInt(req.params.id));
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
