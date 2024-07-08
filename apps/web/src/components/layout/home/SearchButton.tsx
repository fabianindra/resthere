import { HStack, Heading } from '@chakra-ui/react';
import { ArrowCircleRight } from '@phosphor-icons/react';
import React from 'react';

export default function SearchButton({ onClick }: any) {
  return (
    <HStack
      py={{ base: 4, sm: '2.75rem' }}
      className="flex-1 text-travertine hover:cursor-pointer"
      minW={{ base: 'fit-content', sm: 'full' }}
      justifyContent={'center'}
      alignItems={'center'}
      backgroundColor={'primary'}
      onClick={onClick}
    >
      <Heading mr={2} as={'h3'} size={{ base: 'md', sm: 'lg' }}>
        Search
      </Heading>
      <ArrowCircleRight className="mt-2" size={32} />
    </HStack>
  );
}
