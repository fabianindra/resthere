import React, { useEffect, useState } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BookingTenant } from '@/types';

const TenantBookingList: React.FC = () => {
  const [pendingBookings, setPendingBookings] = useState<BookingTenant[]>([]);
  const [approvedBookings, setApprovedBookings] = useState<BookingTenant[]>([]);
  const userData = Cookies.get('user');
  const idGoogle = Cookies.get('id')
  
  let tenantId: string | null = null;

  if (idGoogle) {
    tenantId = idGoogle;
  } else if (userData) {
    try {
      const parsedUserData = JSON.parse(userData);
      console.log('Parsed User Data:', parsedUserData);
      tenantId = parsedUserData.id;
    } catch (error) {
      console.error('Error parsing user data from cookies:', error);
    }
  }

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:6570/api/booking-list/all-booking-tenant/${tenantId}`);
      const responseData = response.data;
      const allBookings = responseData.data;

      const pending = allBookings.filter((booking: BookingTenant) => booking.status === 'waiting payment confirmation');
      const approved = allBookings.filter((booking: BookingTenant) => booking.status !== 'waiting payment confirmation');

      setPendingBookings(pending);
      setApprovedBookings(approved);
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
      await axios.post('http://localhost:6570/api/transaction/update-status', { transactionId: bookingId, status: 'approved' });
      console.log('Booking approved successfully');
      fetchBookings();
    } catch (error) {
      console.error('Failed to approve booking:', error);
    }
  }

  return (
    <Box>
      <Box borderWidth="1px" borderRadius="lg" p={6} mb={4}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Pending Bookings
        </Text>
        {pendingBookings.length === 0 ? (
          <Text>No pending bookings found.</Text>
        ) : (
          pendingBookings.map((booking, index) => (
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
              <Button colorScheme="blue" onClick={() => handleApprove(booking.id)}>
                Approve Booking
              </Button>
            </Box>
          ))
        )}
      </Box>
      <Box borderWidth="1px" borderRadius="lg" p={6} mb={4}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Approved Bookings
        </Text>
        {approvedBookings.length === 0 ? (
          <Text>No approved bookings found.</Text>
        ) : (
          approvedBookings.map((booking, index) => (
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
          ))
        )}
      </Box>
    </Box>
  );
};

export default TenantBookingList;
