import {
  repoGetBookings,
  repoGetBookingsTenant,
} from '../repository/booking.repository';

export const serviceGetBookings = async (req: any) => {
  const { user_id } = req.params;
  try {
    if (!user_id) {
      throw new Error('User ID is missing');
    }
    const bookings: any = await repoGetBookings(parseInt(user_id));
    const enhancedBookings = bookings.map((booking: any) => ({
      ...booking,
      room_name: booking.room.name,
      property_name: booking.room.property.name,
      date: booking.check_in,
    }));
    return {
      status: 200,
      success: true,
      message: 'get bookings success',
      data: enhancedBookings,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    };
  }
};

export const serviceGetBookingsTenant = async (req: any) => {
  const { tenant_id } = req.params;
  try {
    if (!tenant_id) {
      throw new Error('Tenant ID is missing');
    }
    const bookings = await repoGetBookingsTenant(parseInt(tenant_id));
    const enhancedBookings = bookings.map((booking: any) => ({
      ...booking,
      username: booking.user.username,
      email: booking.user.email,
      room_name: booking.room.name,
      property_name: booking.room.property.name,
      check_in: booking.check_in,
      check_out: booking.check_out,
    }));
    return {
      status: 200,
      success: true,
      message: 'get bookings success',
      data: enhancedBookings,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    };
  }
};
