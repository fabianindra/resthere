import React from 'react';
import { Flex, Heading, Button, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { HeaderProps } from '@/types';

const Header: React.FC<HeaderProps> = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="start"
      className="sticky py-8 bg-[#FFFFFF]"
      width="100%"
    >
      <Link href="/">
        <Heading textAlign={'start'} color="primary" as="h2" size="lg">
          Resthere
        </Heading>
      </Link>
    </Flex>
  );
};

export default Header;
