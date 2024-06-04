import { HStack, Heading, Image, Box, Text } from '@chakra-ui/react';
import React from 'react';

export default function HeroItem({
  headline,
  subheadline,
  title,
  image,
}: {
  headline: string;
  subheadline: string;
  title: string;
  image: string;
}) {
  return (
    <HStack
      p={10}
      className=" h-fit min-w-full bg-primary justify-around rounded-xl flex-wrap-reverse"
    >
      <Box width={600} color={'travertine'}>
        <Heading as="h3" size="2xl" fontWeight={'medium'}>
          {headline}
        </Heading>
        <Heading as="h3" size="2xl">
          {subheadline}
        </Heading>
        <Text mt={8} fontSize={'lg'}>
          {title}
        </Text>
      </Box>
      <HStack>
        <Image
          src={image}
          alt={'hero'}
          objectFit="cover"
          width={400}
          height={400}
        />
      </HStack>
    </HStack>
  );
}
