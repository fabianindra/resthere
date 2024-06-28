import {
  addSpecialPrice,
  deleteSpecialRoom,
  editSpecialPrice,
  getSpecialPriceById,
  getSpecialPriceByRoom,
} from '../repository/specialprice.repository';

export const serviceGetSpecialPriceByRoom = async (req: any) => {
  const { room_id } = req.params;
  try {
    const data = await getSpecialPriceByRoom(parseInt(room_id));
    return {
      status: 200,
      success: true,
      message: 'get detail special price successfully',
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

export const serviceGetSpecialPriceById = async (req: any) => {
  const { id } = req.params;
  try {
    const data = await getSpecialPriceById(parseInt(id));
    return {
      status: 200,
      success: true,
      message: 'get detail special price successfully',
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

export const serviceAddSpecialPrice = async (req: any) => {
  const { room_id, start_date, end_date, special_price } = req.body;
  try {
    const data = await addSpecialPrice({
      room_id,
      start_date,
      end_date,
      special_price,
    });
    return {
      status: 201,
      success: true,
      message: 'add special price successfully',
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

export const serviceUpdateSpecialPrice = async (req: any) => {
  const { specialprice_id, start_date, end_date, special_price } = req.body;
  //console.log(req.body);
  try {
    const data = await editSpecialPrice({
      specialprice_id,
      start_date,
      end_date,
      special_price: parseInt(special_price as string),
    });
    return {
      status: 201,
      success: true,
      message: 'update special price successfully',
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

export const serviceDeleteSpecialPrice = async (req: any) => {
  const { specialprice_id } = req.params;
  try {
    const data = await deleteSpecialRoom(parseInt(specialprice_id));
    return {
      status: 201,
      success: true,
      message: 'delete special price successfully',
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
