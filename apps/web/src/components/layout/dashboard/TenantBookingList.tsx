import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Box,
  Text,
  Grid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  Image,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { BookingTenant } from '@/types';
import { rejectTransaction, cancelTransaction } from '@/api/transaction';
import { fetchTenantId, fetchBookingsData, handleTransaction } from './utils';
import BookingCard from './BookingCard';
import Pagination from './Pagination';
import ModalApproveTransaction from './ModalApproveTransaction';
import axios from 'axios';
import { apiUrl, imageUrl } from '@/api';

const BOOKINGS_PER_PAGE = 5;

const TenantBookingList: React.FC = () => {
  const [pendingBookings, setPendingBookings] = useState<BookingTenant[]>([]);
  const [approvedBookings, setApprovedBookings] = useState<BookingTenant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [paymentProofUrl, setPaymentProofUrl] = useState<string | null>(null);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const toast = useToast();

  const tenantId = fetchTenantId();

  useEffect(() => {
    if (tenantId)
      fetchBookingsData(tenantId, setPendingBookings, setApprovedBookings);
    else console.error('Tenant ID not found in cookies');
  }, [tenantId]);

  const handleApprove = () => onOpen();
  const handleReject = (bookingId: string) =>
    handleTransaction(
      rejectTransaction,
      bookingId,
      () =>
        fetchBookingsData(tenantId!, setPendingBookings, setApprovedBookings),
      toast,
      'Rejected transaction successfully',
      'Failed to reject transaction',
    );
  const handleCancel = (bookingId: string) =>
    handleTransaction(
      cancelTransaction,
      bookingId,
      () =>
        fetchBookingsData(tenantId!, setPendingBookings, setApprovedBookings),
      toast,
      'Cancelled transaction successfully',
      'Failed to cancel transaction',
    );
  const handleViewPaymentProof = async (bookingId: string) => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/transaction/payment-proof/${bookingId}`,
      );
      setPaymentProofUrl(data.data.proof);
      setIsProofModalOpen(true);
    } catch (error) {
      console.error('Error fetching payment proof:', error);
    }
  };

  const currentBookings = pendingBookings.slice(
    (currentPage - 1) * BOOKINGS_PER_PAGE,
    currentPage * BOOKINGS_PER_PAGE,
  );
  const totalPages = Math.ceil(pendingBookings.length / BOOKINGS_PER_PAGE);

  return (
    <Box p={{ base: 2, md: 6 }}>
      <Box borderWidth="1px" borderRadius="lg" p={6} mb={6} boxShadow="lg">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Pending Bookings
        </Text>
        {pendingBookings.length === 0 ? (
          <Text>No pending bookings found.</Text>
        ) : (
          <>
            <Grid
              templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
              gap={6}
            >
              {currentBookings.map((booking: any) => (
                <Box key={booking.id}>
                  <BookingCard
                    booking={booking}
                    isPending={true}
                    handleApprove={handleApprove}
                    handleReject={handleReject}
                    handleCancel={handleCancel}
                    handleViewPaymentProof={handleViewPaymentProof}
                  />
                  <ModalApproveTransaction
                    isOpen={isOpen}
                    onClose={onClose}
                    email={booking.user.email}
                    bookingId={booking.id}
                    fetchBookings={() =>
                      fetchBookingsData(
                        tenantId ? tenantId : '',
                        setPendingBookings,
                        setApprovedBookings,
                      )
                    }
                  />
                </Box>
              ))}
            </Grid>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </Box>
      <Box overflowX="auto">
        <Table
          overflowX="auto"
          variant="striped"
          colorScheme="gray"
          borderWidth="1px"
          borderRadius="lg"
          p={6}
          boxShadow="lg"
        >
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
            {approvedBookings.map((booking) => (
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
      </Box>

      <Modal
        isOpen={isProofModalOpen}
        onClose={() => setIsProofModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Payment Proof</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {paymentProofUrl && (
              <Image
                src={`${imageUrl}/${paymentProofUrl}`}
                alt="Payment Proof"
                width={500}
                height={300}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => setIsProofModalOpen(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TenantBookingList;
