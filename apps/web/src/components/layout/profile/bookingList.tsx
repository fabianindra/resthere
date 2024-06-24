import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Booking } from '@/types';

const BookingList: React.FC<any> = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const userData = Cookies.get('user');
  const userId = userData ? JSON.parse(userData).id : null;
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  useEffect(() => {
    if (!userId) {
      console.error('User ID not found in cookies');
      return;
    }
  
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:6570/api/booking-list/all-booking/${userId}`);
        const responseData = response.data;
        console.log('Response data:', responseData);
        setBookings(responseData.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
  
    fetchBookings();
  }, [userId]);

  const handleUploadPaymentProof = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePaymentProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPaymentProof(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (paymentProof) {
      const formData = new FormData();
      formData.append('paymentProof', paymentProof);
      formData.append('transactionId', String(selectedBooking?.id) || '');

      try {
        const response = await axios.post('http://localhost:6570/api/transaction/upload-payment-proof', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error uploading payment proof:', error);
      }
    }
  };

  const pendingPaymentBookings = bookings.filter(booking => booking.status === 'waiting payment');
  const pendingApprovalBookings = bookings.filter(booking => booking.status === 'waiting payment confirmation');
  const approvedBookings = bookings.filter(booking => booking.status === 'approved');

  return (
    <>
      <Box>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Bookings Needing Payment Proof
        </Text>
        {pendingPaymentBookings.length === 0 ? (
          <Text>No bookings needing payment proof found.</Text>
        ) : (
          pendingPaymentBookings.map((booking, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" p={6} mb={4}>
              <Text fontSize="xl" fontWeight="bold" mb={2}>
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
              <Button colorScheme="blue" onClick={() => handleUploadPaymentProof(booking)}>
                Upload Payment Proof
              </Button>
            </Box>
          ))
        )}
      </Box>

      <Box>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Bookings Waiting for Approval
        </Text>
        {pendingApprovalBookings.length === 0 ? (
          <Text>No bookings waiting for approval found.</Text>
        ) : (
          pendingApprovalBookings.map((booking, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" p={6} mb={4}>
              <Text fontSize="xl" fontWeight="bold" mb={2}>
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
          ))
        )}
      </Box>

      <Box>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Approved Bookings
        </Text>
        {approvedBookings.length === 0 ? (
          <Text>No approved bookings found.</Text>
        ) : (
          approvedBookings.map((booking, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" p={6} mb={4}>
              <Text fontSize="xl" fontWeight="bold" mb={2}>
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
          ))
        )}
      </Box>

      {selectedBooking && (
        <Modal onClose={handleCloseModal} isOpen={isModalOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Upload Payment Proof</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Booking ID: {selectedBooking.id}</Text>
              <input type="file" onChange={handlePaymentProofChange} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
                Close
              </Button>
              <Button colorScheme="green" onClick={handleUpload}>
                Upload
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default BookingList;
