import { HStack, Heading, Text, VStack, Link } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <HStack
      justifyContent={'space-between'}
      flexWrap={'wrap'}
      alignItems={'start'}
      gap={8}
      className="px-20 py-10 "
    >
      <HStack>
        <Heading ml={-4} color={'primary'} as="h2" size="lg">
          Hostel
        </Heading>
      </HStack>
      <VStack maxW={300} justifyContent={'start'} alignItems={'start'}>
        <Heading as={'h3'} size={'md'}>
          About
        </Heading>
        <Text textAlign={'justify'} mt={2} color={'gray.400'}>
        All material herein ©2024 Hostel Indonesia Company Pte. Ltd. All Rights Reserved.
        Hostel is part of Hostel International Inc., online travel & related services.
        </Text>
      </VStack>
      <VStack alignItems={'start'}>
        <Heading as={'h3'} size={'md'}>
          External Link
        </Heading>
        <Link color={'gray.400'}>Careers</Link>
        <Link color={'gray.400'}>Instagram</Link>
        <Link color={'gray.400'}>Facebook</Link>
        <Link color={'gray.400'}>Service</Link>
      </VStack>
      <VStack alignItems={'start'}>
        <Heading as={'h3'} size={'md'}>
          Property & Promotion
        </Heading>
        <Link color={'gray.400'}>Luxury Stays</Link>
        <Link color={'gray.400'}>Promo</Link>
        <Link color={'gray.400'}>Property in the Mountains</Link>
        <Link color={'gray.400'}>Propoerty near the Beach</Link>
      </VStack>
      <VStack alignItems={'start'}>
        <Heading as={'h3'} size={'md'}>
          Contact us
        </Heading>
        <Link color={'gray.400'}>Hostel@gmail.com</Link>
        <Link color={'gray.400'}>(099) 589254</Link>
        <Link color={'gray.400'}>Jl Pemuda kec tahunan Jepara</Link>
      </VStack>
    </HStack>
  );
};
