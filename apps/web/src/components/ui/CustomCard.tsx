import {
  Card,
  CardBody,
  HStack,
  Heading,
  CardFooter,
  Box,
  Image,
  Text,
} from '@chakra-ui/react';
import { MapPin, Star } from '@phosphor-icons/react';
import React from 'react';

export default function CustomCard() {
  return (
    <Card maxW="xs">
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <HStack mt={4} color={'gray.400'}>
          <MapPin size={20} weight="fill" />
          <Text fontSize={'sm'}>Tahunan, Jepara</Text>
        </HStack>
        <Heading size="md" mt={4}>
          Living room Sofa
        </Heading>
      </CardBody>
      <CardFooter justifyContent={'space-between'}>
        <HStack>
          <Star size={20} weight="fill" />
          <Text fontSize={'sm'}>5.0 (Review)</Text>
        </HStack>
        <Box>
          <Text fontSize={'md'} fontWeight={'bold'}>
            Rp. 500.00
          </Text>
        </Box>
      </CardFooter>
    </Card>
  );
}
