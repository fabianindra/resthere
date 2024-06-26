import React from 'react';
import { Flex, Heading, Button, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { HeaderProps } from '@/types';

const Header: React.FC<HeaderProps> = () => {
  return (
    <Link href="/">
      <Heading textAlign={'start'} color="primary" as="h2" size="lg">
        Hostel
      </Heading>
    </Link>
  );
};

export default Header;
