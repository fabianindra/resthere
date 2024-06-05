import {
  repoAddRoom,
  repoCheckRoom,
  repoDeleteRoom,
  repoGetRoom,
  repoUpdateRoom,
} from '../repository/room.repository';

export const serviceGetALLRoom = async () => {
  try {
    const data = await repoGetRoom();
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

export const serviceAddRoom = async (req: any) => {
  const {
    name,
    price,
    weekend_price,
    capacity_person,
    capacity_room,
    room_size,
    available_room,
    property_id,
  } = req.body;
  if (
    !name ||
    !price ||
    !weekend_price ||
    !capacity_person ||
    !capacity_room ||
    !room_size ||
    !available_room ||
    !property_id
  ) {
    return {
      status: 401,
      success: true,
      message: 'invalid input',
    };
  }
  try {
    const data = await repoAddRoom({
      name,
      price,
      weekend_price,
      capacity_person,
      capacity_room,
      room_size,
      available_room,
      property_id,
    });
    return {
      status: 201,
      success: true,
      message: 'add rooms successfully',
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

export const serviceUpdateRoom = async (req: any) => {
  const {
    name,
    price,
    weekend_price,
    capacity_person,
    capacity_room,
    room_size,
    available_room,
    id,
  } = req.body;

  if (
    !name ||
    !price ||
    !weekend_price ||
    !capacity_person ||
    !capacity_room ||
    !room_size ||
    !available_room
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
      price,
      weekend_price,
      capacity_person,
      capacity_room,
      room_size,
      available_room,
      id,
    });
    return {
      status: 201,
      success: true,
      message: 'update rooms successfully',
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
