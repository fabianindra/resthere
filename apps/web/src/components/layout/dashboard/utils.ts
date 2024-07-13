import Cookies from 'js-cookie';
import axios from 'axios';
import { ToastId, useToast } from '@chakra-ui/react';
import { BookingTenant } from '@/types';
import { apiUrl } from '@/api';

export const fetchTenantId = (): string | null => {
  const userData = Cookies.get('user');
  const idGoogle = Cookies.get('id');
  if (idGoogle) return idGoogle;
  if (userData) {
    try {
      return JSON.parse(userData).id;
    } catch (error) {
      console.error('Error parsing user data from cookies:', error);
    }
  }
  return null;
};

export const fetchBookingsData = async (
  tenantId: string,
  setPendingBookings: React.Dispatch<React.SetStateAction<BookingTenant[]>>,
  setApprovedBookings: React.Dispatch<React.SetStateAction<BookingTenant[]>>
) => {
  try {
    const { data } = await axios.get(`${apiUrl}/booking-list/all-booking-tenant/${tenantId}`);
    const allBookings = data.data;
    setPendingBookings(allBookings.filter((booking: BookingTenant) => booking.status === 'waiting payment confirmation'));
    setApprovedBookings(allBookings.filter((booking: BookingTenant) => booking.status === 'approved'));
  } catch (error) {
    console.error('Error fetching bookings:', error);
  }
};

export const handleTransaction = async (
  transactionFn: (bookingId: string) => Promise<any>,
  bookingId: string,
  fetchBookings: () => void,
  toast: ReturnType<typeof useToast>,
  successMessage: string,
  errorMessage: string
): Promise<void> => {
  try {
    await transactionFn(bookingId);
    fetchBookings();
    toast({
      title: successMessage,
      status: 'success',
      position: 'top',
      isClosable: true,
    });
  } catch (error) {
    toast({
      title: errorMessage,
      status: 'error',
      position: 'top',
      isClosable: true,
    });
  }
};
