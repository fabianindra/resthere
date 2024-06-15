import { VStack, Heading, HStack, Text } from '@chakra-ui/react';
import { User, Bed, Ruler } from '@phosphor-icons/react';
import React from 'react';

export function RoomInfo({ user, bed, size }: any) {
  return (
    <VStack alignItems={'start'} my={8}>
      <Heading size={'sm'}>Room Information</Heading>
      <HStack mt={2} gap={6}>
        <HStack>
          <User size={20} weight="fill" />
          <Text fontSize="sm">{user}</Text>
        </HStack>
        <HStack>
          <Bed size={20} weight="fill" />
          <Text fontSize="sm">{bed}</Text>
        </HStack>
        <HStack>
          <Ruler size={20} />
          <Text fontSize="sm">{size}</Text>
        </HStack>
      </HStack>
    </VStack>
  );
}
