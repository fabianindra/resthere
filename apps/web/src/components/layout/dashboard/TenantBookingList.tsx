import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BookingTenant } from '@/types';

const TenantBookingList: React.FC = () => {
  const [bookings, setBookings] = useState<BookingTenant[]>([]);
  const userData = Cookies.get('user');
  const tenantId = userData ? JSON.parse(userData).id : null;

  useEffect(() => {
    if (!tenantId) {
      console.error('Tenant ID not found in cookies');
      return;
    }
  
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
  
    fetchBookings();
  }, [tenantId]);

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
        </Box>
      ))}
    </Box>
  );
};

export default TenantBookingList;
