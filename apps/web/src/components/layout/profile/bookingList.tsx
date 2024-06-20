import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Booking } from '@/types';

const BookingList: React.FC<any> = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const userData = Cookies.get('user');
  const userId = userData ? JSON.parse(userData).id : null;

  useEffect(() => {
    if (!userId) {
      console.error('User ID not found in cookies');
      return;
    }
  
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:6570/api/booking-list/all-booking/${userId}`);
        const responseData = response.data; // Access the data property
        console.log('Response data:', responseData); // For debugging
        setBookings(responseData.data); // Set the state with the array
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
  
    fetchBookings();
  }, [userId]);
  

  if (bookings.length === 0) {
    return <>No bookings found for this user.</>;
  }

  return (
    <>
      {bookings.map((booking, index) => (
        <Box key={index} borderWidth="1px" borderRadius="lg" p={6} mb={4}>
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Property Bookings
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              Property:
            </Text>{' '}
            {booking.property_name}
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              Room:
            </Text>{' '}
            {booking.room_name}
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              Booking Date:
            </Text>{' '}
            {booking.date}
          </Text>
        </Box>
      ))}
    </>
  );
};

export default BookingList;
