import { Box, HStack, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';

export default function Hero() {
  return (
    <HStack
      p={10}
      className=" h-fit w-full bg-primary justify-around rounded-xl flex-wrap-reverse"
    >
      <Box color={'travertine'}>
        <Heading as="h3" size="2xl" fontWeight={'medium'}>
          Find Your Ideal Stay
        </Heading>
        <Heading as="h3" size="2xl">
          Perfectly Suited To You!
        </Heading>
        <Text mt={8} fontSize={'lg'}>
          An all-in-one platform that helps you to find what you needed
        </Text>
      </Box>
      <HStack>
        <Image
          src={'/hero4.png'}
          alt={'hero'}
          objectFit="cover"
          width={500}
          height={400}
        />
      </HStack>
    </HStack>
  );
}
