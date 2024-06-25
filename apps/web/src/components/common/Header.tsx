import React from 'react';
import { Flex, Heading, Button, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { HeaderProps } from '@/types';

const Header: React.FC<HeaderProps> = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      className="sticky px-20 py-8 bg-[#FFFFFF]"
      width="100%"
    >
      <Link href="/">
        <Heading ml={-4} color="primary" as="h2" size="lg">
          Hostel
        </Heading>
      </Link>

      <Flex gap={2}>
        <Button
          border="2px"
          borderColor="gray.300"
          borderRadius={50}
          variant="outline"
        >
          <Link href="/transaction">
          <Text fontWeight="light">Transaction</Text>
          </Link>
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
