import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, 
  ModalBody, ModalFooter
 } from '@chakra-ui/react';
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
    // Implement upload logic here
    if (paymentProof) {
      // Example: Upload payment proof using axios
      const formData = new FormData();
      formData.append('paymentProof', paymentProof);
      formData.append('transactionId', String(selectedBooking?.id) || '');

      try {
        const response = await axios.post('http://localhost:6570/api/transaction/upload-payment-proof', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log(response.data);

        // Close modal after successful upload
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error uploading payment proof:', error);
      }
    }
  };

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

          {/* Conditional rendering for Upload Payment Proof button */}
          {booking.status === 'waiting payment' && (
            <Button colorScheme="blue" onClick={() => handleUploadPaymentProof(booking)}>
              Upload Payment Proof
            </Button>
          )}
        </Box>
      ))}

      {/* Modal for uploading payment proof */}
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
