import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import FormRating from './FormRating';
import { addReview } from '@/api/review';

export default function ModalReview(props: any) {
  const { property_id, onClose, isOpen, overlay } = props;
  const [rating, setRating] = useState(0);
  const [feedBack, setFeedback] = useState('');
  const toast = useToast();

  const handleMouseOver = (index: any) => {
    setRating(index + 1);
  };

  const handleClick = (index: any) => {
    setRating(index + 1);
  };

  const actionAddRating = async () => {
    try {
      const response = await addReview(property_id, rating, feedBack);
      toast({
        title: `Success to add rating`,
        status: 'success',
        position: 'top',
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: `Failed to add rating`,
        status: 'error',
        position: 'top',
        isClosable: true,
      });
    }
  };

  return (
    <Modal size={'xl'} isCentered isOpen={isOpen} onClose={onClose}>
      {overlay}
      <ModalContent>
        <ModalHeader className="text-blueDark border-b-2 border-blueDark">
          <Heading as="h3" mr={8} size="md">
            Add Coment
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mt={4} fontWeight={'semibold'} fontSize="lg">
            Add Rating
          </Text>
          <FormRating
            rating={rating}
            handleMouseOver={handleMouseOver}
            handleClick={handleClick}
          />
          <Text mt={6} fontWeight={'semibold'} fontSize="lg">
            Feed Back
          </Text>
          <Textarea
            placeholder="Here is a sample placeholder"
            size="sm"
            resize={'none'}
            mt={4}
            border={2}
            borderColor={'gray.600'}
            borderStyle={'solid'}
            borderRadius={5}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <VStack justifyContent={'end'} alignItems={'end'} w={'100%'}>
            <Button onClick={actionAddRating} type="submit" colorScheme="red">
              Submit
            </Button>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
