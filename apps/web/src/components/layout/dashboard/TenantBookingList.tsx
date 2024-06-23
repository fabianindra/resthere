import React, { useEffect, useState } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BookingTenant } from '@/types';

const TenantBookingList: React.FC = () => {
  const [bookings, setBookings] = useState<BookingTenant[]>([]);
  const userData = Cookies.get('user');
  const tenantId = userData ? JSON.parse(userData).id : null;

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:6570/api/booking-list/all-booking-tenant/${tenantId}`);
      const responseData = response.data;
      console.log('Response data:', responseData);
      setBookings(responseData.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    if (!tenantId) {
      console.error('Tenant ID not found in cookies');
      return;
    }
  
    fetchBookings();
  }, [tenantId]);

  const handleApprove = async (bookingId: string) => {
    try {
      const response = await axios.post('http://localhost:6570/api/transaction/update-status', { transactionId: bookingId, status: 'approved' });
      console.log('Booking approved successfully');
      // Refetch all bookings after approval
      fetchBookings();
    } catch (error) {
      console.error('Failed to approve booking:', error);
    }
  }

  if (bookings.length === 0) {
    return <>No bookings found for this tenant.</>;
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6} mb={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Bookings
      </Text>
      {bookings.map((booking, index) => (
        <Box key={index} mb={4}>
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            {booking.property_name}
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              Username:
            </Text>{' '}
            {booking.username}
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              Email:
            </Text>{' '}
            {booking.email}
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              Room:
            </Text>{' '}
            {booking.room_name}
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              Check-in Date:
            </Text>{' '}
            {new Date(booking.check_in).toLocaleDateString()}
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              Check-out Date:
            </Text>{' '}
            {new Date(booking.check_out).toLocaleDateString()}
          </Text>
          {booking.status === 'waiting payment confirmation' && (
            <Button colorScheme="blue" onClick={() => handleApprove(booking.id)}>
              Approve Booking
            </Button>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default TenantBookingList;
