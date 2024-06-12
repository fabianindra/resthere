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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          veniam alias, sint, reprehenderit eos beatae cum facilis iste earum
          tempore accusamus? Libero hic quaerat aut, nisi asperiores perferendis
          facilis vel?
        </Text>
      </VStack>
      <VStack alignItems={'start'}>
        <Heading as={'h3'} size={'md'}>
          Use Link
        </Heading>
        <Link color={'gray.400'}>Careers</Link>
        <Link color={'gray.400'}>Blogs</Link>
        <Link color={'gray.400'}>Instagram</Link>
        <Link color={'gray.400'}>Facebook</Link>
        <Link color={'gray.400'}>Service</Link>
      </VStack>
      <VStack alignItems={'start'}>
        <Heading as={'h3'} size={'md'}>
          Everything
        </Heading>
        <Link color={'gray.400'}>Suite Room</Link>
        <Link color={'gray.400'}>Promo</Link>
        <Link color={'gray.400'}>Mountain</Link>
        <Link color={'gray.400'}>Beach</Link>
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
