import { approveTransaction } from '@/api/transaction';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';

export default function ModalApproveTransaction({
  isOpen,
  onClose,
  email,
  bookingId,
  fetchBookings,
}: any) {
  const [value, setValue] = useState('');
  const toast = useToast();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleApprove = async () => {
    try {
      await approveTransaction(bookingId, email, value);
      toast({
        title: 'approve transaction succesfuly',
        status: 'success',
        position: 'top',
        isClosable: true,
      });
      fetchBookings();
      onClose();
    } catch (error) {
      toast({
        title: 'Failed to approve transaction',
        status: 'error',
        position: 'top',
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send Email In User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Message</FormLabel>
              <Input
                value={value}
                onChange={(e: any) => setValue(e.target.value)}
                placeholder="Message"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleApprove} colorScheme="blue" mr={3}>
              Send
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
