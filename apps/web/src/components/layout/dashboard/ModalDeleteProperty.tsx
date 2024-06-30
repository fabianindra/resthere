import { deleteProperty } from '@/api/property';
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
import Cookies from 'js-cookie';
import React from 'react';

export default function ModalDeleteProperty({
  id,
  fetchData,
}: {
  id: number;
  fetchData: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: any = React.useRef();
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await deleteProperty(id);
      toast({
        title: 'Delete property successfully',
        status: 'success',
        position: 'top',
        isClosable: true,
      });
      fetchData();
      onClose();
    } catch (error) {
      toast({
        title: 'Delete property failed',
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
              Delete Property
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
