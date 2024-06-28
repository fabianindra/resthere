import {
  addRoomAvailability,
  deleteRoomAvailability,
  editRoomAvailability,
  getRoomAvailabilityById,
  getRoomAvailabilityByRoom,
} from '../repository/roomavailability.repository';

export const serviceGetRoomAvailabilityByRoom = async (req: any) => {
  const { room_id } = req.params;
  try {
    const data = await getRoomAvailabilityByRoom(parseInt(room_id));
    return {
      status: 200,
      success: true,
      message: 'get detail room availability successfully',
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

export const serviceGetRoomAvailabilityById = async (req: any) => {
  const { id } = req.params;
  try {
    const data = await getRoomAvailabilityById(parseInt(id));
    return {
      status: 200,
      success: true,
      message: 'get detail room availability successfully',
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

export const serviceAddRoomAvailability = async (req: any) => {
  const { room_id, start_date, end_date } = req.body;
  try {
    const data = await addRoomAvailability({
      room_id,
      start_date,
      end_date,
    });
    return {
      status: 201,
      success: true,
      message: 'add room availability successfully',
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

export const serviceUpdateRoomAvailability = async (req: any) => {
  const { roomavailability_id, start_date, end_date } = req.body;
  //console.log(roomavailability_id);
  try {
    const data = await editRoomAvailability({
      roomavailability_id,
      start_date,
      end_date,
    });
    return {
      status: 201,
      success: true,
      message: 'update room availability successfully',
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

export const serviceDeleteRoomAvailability = async (req: any) => {
  const { roomavailability_id } = req.params;
  try {
    const data = await deleteRoomAvailability(parseInt(roomavailability_id));
    return {
      status: 201,
      success: true,
      message: 'delete room availability successfully',
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
