import { HStack, Heading, Input, Button, Box, Image } from '@chakra-ui/react';
import React from 'react';

export default function UpdateEmail() {
  return (
    <HStack
      alignItems={'start'}
      className="mt-20 p-10 w-full bg-primary text-travertine"
    >
      <Image display={['none', 'inline-block']} src="info.png" height={200} />
      <Box>
        <Heading as="h3" size="lg">
          Stay updated with hotel tips, recommendations, and latest promos.
        </Heading>
        <HStack mt={8}>
          <Input placeholder="Your Email" />
          <Button colorScheme="gray" variant="solid">
            Subrice
          </Button>
        </HStack>
      </Box>
    </HStack>
  );
}
