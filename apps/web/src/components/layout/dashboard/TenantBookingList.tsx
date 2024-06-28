import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Grid, Card, 
  CardHeader, CardBody, CardFooter, 
  Badge, Table, Thead, Tbody, Tr, Th, Td, IconButton, HStack,
  Modal, ModalBody, ModalCloseButton, ModalHeader, ModalFooter,
  ModalOverlay, ModalContent
 } from '@chakra-ui/react';
import { CheckCircleIcon, TimeIcon } from '@chakra-ui/icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BookingTenant } from '@/types';
import Image from 'next/image';

const TenantBookingList: React.FC = () => {
  const [pendingBookings, setPendingBookings] = useState<BookingTenant[]>([]);
  const [approvedBookings, setApprovedBookings] = useState<BookingTenant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentProofUrl, setPaymentProofUrl] = useState<string | null>(null); // State for payment proof URL
  const [isProofModalOpen, setIsProofModalOpen] = useState(false); // State for modal visibility

  const bookingsPerPage = 5;

  const userData = Cookies.get('user');
  const idGoogle = Cookies.get('id');

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
      const approved = allBookings.filter((booking: BookingTenant) => booking.status === 'approved');

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

  const handleReject = async (bookingId: string) => {
    try {
      await axios.post('http://localhost:6570/api/transaction/update-status', { transactionId: bookingId, status: 'waiting payment' });
      console.log('Booking rejected successfully');
      fetchBookings();
    } catch (error) {
      console.error('Failed to reject booking:', error);
    }
  }

  const handleViewPaymentProof = async (bookingId: string) => {
    try {
      const response = await axios.get(`http://localhost:6570/api/transaction/payment-proof/${bookingId}`);
      const paymentProofUrl = response.data.data.proof;
      console.log(response)
      console.log(paymentProofUrl)
      setPaymentProofUrl(paymentProofUrl);
      setIsProofModalOpen(true);
    } catch (error) {
      console.error('Error fetching payment proof:', error);
    }
  };

  const renderBookingCard = (booking: BookingTenant, isPending: boolean) => (
    <Card key={booking.id} borderRadius="lg" boxShadow="md" mb={4} p={4}>
      <CardHeader>
        <Text fontSize="xl" fontWeight="bold">{booking.property_name}</Text>
        <Badge colorScheme={isPending ? "yellow" : "green"} ml={2}>
          {isPending ? <TimeIcon mr={1} /> : <CheckCircleIcon mr={1} />}
          {isPending ? "Pending" : "Approved"}
        </Badge>
      </CardHeader>
      <CardBody>
        <Text><strong>Username:</strong> {booking.username}</Text>
        <Text><strong>Email:</strong> {booking.email}</Text>
        <Text><strong>Room:</strong> {booking.room_name}</Text>
        <Text><strong>Check-in Date:</strong> {new Date(booking.check_in).toLocaleDateString()}</Text>
        <Text><strong>Check-out Date:</strong> {new Date(booking.check_out).toLocaleDateString()}</Text>
      </CardBody>
      {isPending && (
        <CardFooter>
           <Button colorScheme="green" onClick={() => handleViewPaymentProof(booking.id)}>
            Proof
          </Button>
          <Button ml={10} colorScheme="blue" onClick={() => handleApprove(booking.id)}>
            Approve
          </Button>
          <Button ml={1} colorScheme="red" onClick={() => handleReject(booking.id)}>
            Reject
          </Button>
        </CardFooter>
      )}
    </Card>
  );

  const renderPendingBookings = () => {
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = pendingBookings.slice(indexOfFirstBooking, indexOfLastBooking);
    const totalPages = Math.ceil(pendingBookings.length / bookingsPerPage);

    return (
      <Box borderWidth="1px" borderRadius="lg" p={6} mb={6} boxShadow="lg">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>Pending Bookings</Text>
        {pendingBookings.length === 0 ? (
          <Text>No pending bookings found.</Text>
        ) : (
          <>
            <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
              {currentBookings.map(booking => renderBookingCard(booking, true))}
            </Grid>
            <Box mt={4} textAlign="center">
              <HStack justify="center">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
                <Button
                  onClick={() => setCurrentPage(prev => (prev * bookingsPerPage < pendingBookings.length ? prev + 1 : prev))}
                  disabled={currentPage * bookingsPerPage >= pendingBookings.length}
                >
                  Next
                </Button>
              </HStack>
            </Box>
          </>
        )}
      </Box>
    );
  };

  const renderApprovedBookingsTable = () => (
    <Table variant="striped" colorScheme="gray" borderWidth="1px" borderRadius="lg" p={6} boxShadow="lg">
      <Thead>
        <Tr>
          <Th>Property Name</Th>
          <Th>Username</Th>
          <Th>Email</Th>
          <Th>Room</Th>
          <Th>Check-in Date</Th>
          <Th>Check-out Date</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {approvedBookings.map(booking => (
          <Tr key={booking.id}>
            <Td>{booking.property_name}</Td>
            <Td>{booking.username}</Td>
            <Td>{booking.email}</Td>
            <Td>{booking.room_name}</Td>
            <Td>{new Date(booking.check_in).toLocaleDateString()}</Td>
            <Td>{new Date(booking.check_out).toLocaleDateString()}</Td>
            <Td>
              <Badge colorScheme="green">
                <CheckCircleIcon mr={1} /> Approved
              </Badge>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

  return (
    <Box p={6}>
      {renderPendingBookings()}
      {renderApprovedBookingsTable()}

      {/* Payment Proof Modal */}
      <Modal isOpen={isProofModalOpen} onClose={() => setIsProofModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Payment Proof</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {paymentProofUrl && (
              <Image src={paymentProofUrl} alt="Payment Proof" width={500} height={300} />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setIsProofModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TenantBookingList;
