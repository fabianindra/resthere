import { HStack, Input, Button } from '@chakra-ui/react';
import React from 'react';

export function SpecialPriceForm() {
  return (
    <HStack w={'full'} justifyContent={'end'}>
      <Button mb={4} colorScheme="blue" size="xs">
        Add Special Price
      </Button>
    </HStack>
  );
}
