import CustomCard from '@/components/ui/CustomCard';
import { VStack, HStack, Heading, Box, Text } from '@chakra-ui/react';
import { ArrowRight } from '@phosphor-icons/react';
import Link from 'next/link';
import React from 'react';

export default function PropertySection() {
  return (
    <Box mt={20} className="w-full">
      <VStack alignItems={'start'}>
        <HStack>
          <Heading as={'h3'} size={'lg'}>
            Best property
          </Heading>
        </HStack>
        <HStack w={'full'} justifyContent={'space-between'}>
          <Text color={'gray'} fontSize={'md'}>
            Find Your Ideal Stay Perfectly Suited To You!
          </Text>
          <HStack mr={6}>
            <Link className=" underline text-sm" href={'/list-room'}>
              See more
            </Link>
            <ArrowRight size={20} />
          </HStack>
        </HStack>
      </VStack>
      <HStack my={10} justifyContent={'space-between'}>
        <CustomCard city={'Jepara'} name={'Sailendra'} price={0} />
        <CustomCard city={'Jepara'} name={'Sailendra'} price={0} />
        <CustomCard city={'Jepara'} name={'Sailendra'} price={0} />
        <CustomCard city={'Jepara'} name={'Sailendra'} price={0} />
      </HStack>
    </Box>
  );
}
