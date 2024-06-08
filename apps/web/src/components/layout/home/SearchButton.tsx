import { HStack, Heading } from '@chakra-ui/react';
import { ArrowCircleRight } from '@phosphor-icons/react';
import React from 'react';

export default function SearchButton({ onClick }: any) {
  return (
    <HStack
      className="py-11 flex-1 text-travertine hover:cursor-pointer"
      justifyContent={'center'}
      alignItems={'center'}
      backgroundColor={'primary'}
      onClick={onClick}
    >
      <Heading mr={2} as={'h3'} size={'lg'}>
        Search
      </Heading>
      <ArrowCircleRight className="mt-2" size={32} />
    </HStack>
  );
}
