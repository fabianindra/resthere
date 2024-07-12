import React from 'react';
import { Card, Text, Badge, HStack, Button } from '@chakra-ui/react';
import { CheckCircleIcon, TimeIcon } from '@chakra-ui/icons';
import { BookingTenant } from '@/types';

interface BookingCardProps {
  booking: BookingTenant;
  isPending: boolean;
  handleApprove: () => void;
  handleReject: (bookingId: string) => void;
  handleCancel: (bookingId: string) => void;
  handleViewPaymentProof: (bookingId: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, isPending, handleApprove, handleReject, handleCancel, handleViewPaymentProof }) => (
  <Card key={booking.id} borderRadius="lg" boxShadow="md" mb={4} p={4}>
    <Text fontSize="xl" fontWeight="bold">{booking.property_name}</Text>
    <Badge colorScheme={isPending ? 'yellow' : 'green'} ml={2}>
      {isPending ? <TimeIcon mr={1} /> : <CheckCircleIcon mr={1} />}
      {isPending ? 'Pending' : 'Approved'}
    </Badge>
    <Text><strong>Username:</strong> {booking.username}</Text>
    <Text><strong>Email:</strong> {booking.email}</Text>
    <Text><strong>Room:</strong> {booking.room_name}</Text>
    <Text><strong>Check-in Date:</strong> {new Date(booking.check_in).toLocaleDateString()}</Text>
    <Text><strong>Check-out Date:</strong> {new Date(booking.check_out).toLocaleDateString()}</Text>
    <Text color="blue.500" cursor="pointer" onClick={() => handleViewPaymentProof(booking.id)}>View Payment Proof</Text>
    {isPending && (
      <HStack>
        <Button colorScheme="blue" onClick={handleApprove}>Approve</Button>
        <Button colorScheme="yellow" onClick={() => handleReject(booking.id)}>Reject</Button>
        <Button colorScheme="red" onClick={() => handleCancel(booking.id)}>Cancel</Button>
      </HStack>
    )}
  </Card>
);

export default BookingCard;
