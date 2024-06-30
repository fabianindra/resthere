import { getDeleteRoom } from '@/api/rooms';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { TrashSimple } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

export default function ModalDeleteRoom({
  id,
  fetchRooms,
}: {
  id: number;
  fetchRooms: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: any = React.useRef();
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await getDeleteRoom(id);
      toast({
        title: 'Delete room successfully',
        status: 'success',
        position: 'top',
        isClosable: true,
      });
      fetchRooms();
      onClose();
    } catch (error) {
      toast({
        title: 'Delete room failed',
        status: 'error',
        position: 'top',
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Button
        rightIcon={<TrashSimple size={20} />}
        colorScheme="red"
        variant="outline"
        onClick={onOpen}
      >
        Delete
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Room
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You cant undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
