import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Booking } from '@/types';
import { cancelTransaction } from '@/api/transaction';
import ModalReview from '../transaction/ModalReview';
import { apiUrl } from '@/api';

const BookingList: React.FC<any> = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const userData = Cookies.get('user');
  const userId = userData ? JSON.parse(userData).id : null;
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const OverlayOne = () => <ModalOverlay bg="rgba(0, 34, 77, 0.66)" />;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const toast = useToast();

  const handleCancel = async (id: string) => {
    try {
      const response = await cancelTransaction(id);
      toast({
        title: 'cancel transaction succesfuly',
        status: 'success',
        position: 'top',
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to cancel transaction',
        status: 'error',
        position: 'top',
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (!userId) {
      console.error('User ID not found in cookies');
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/booking-list/all-booking/${userId}`,
        );
        const responseData = response.data;
        setBookings(responseData.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [handleCancel]);

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
        const response = await axios.post(
          `${apiUrl}/transaction/upload-payment-proof`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error uploading payment proof:', error);
      }
    }
  };

  const formatBookingDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Box p={4} mb={8}>
        <Heading as="h3" size="md" textAlign="center" mb={6}>
          Your Bookings
        </Heading>
        {bookings.length === 0 ? (
          <Text textAlign="center">No bookings found.</Text>
        ) : (
          <Box mx={{ base: 4, sm: 10 }} overflowX="auto">
            <Table overflowX="auto" whiteSpace={'nowrap'} variant="simple">
              <Thead>
                <Tr>
                  <Th>Property Name</Th>
                  <Th>Room</Th>
                  <Th>Booking Date</Th>
                  <Th>Status</Th>
                  <Th textAlign="end">Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {bookings.map((booking: any, index) => (
                  <Tr key={index}>
                    <Td>{booking.property_name}</Td>
                    <Td>{booking.room_name}</Td>
                    <Td>{formatBookingDate(booking.date)}</Td>
                    <Td>{booking.status}</Td>
                    <Td textAlign="end">
                      {booking.status === 'waiting payment' ? (
                        <>
                          <Button
                            size="sm"
                            colorScheme="blue"
                            onClick={() => handleUploadPaymentProof(booking)}
                          >
                            Upload Payment Proof
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="red"
                            ml={2}
                            onClick={() => handleCancel(booking.id)}
                          >
                            Cancel Booking
                          </Button>
                        </>
                      ) : booking.status === 'approved' ? (
                        <>
                          <Button
                            size="sm"
                            colorScheme="orange"
                            onClick={() => {
                              setOverlay(<OverlayOne />);
                              onOpen();
                            }}
                          >
                            Review
                          </Button>
                          <ModalReview
                            isOpen={isOpen}
                            onClose={onClose}
                            overlay={overlay}
                            property_id={booking.room.property_id}
                          />
                        </>
                      ) : null}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
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

      <Box mb={8} />
    </>
  );
};

export default BookingList;
