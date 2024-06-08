import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Image,
  Heading,
} from '@chakra-ui/react';
import { SignOut, UserCircle } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import React from 'react';

export default function Nav() {
  return (
    <HStack
      justifyContent={'space-between'}
      className=" sticky px-20 py-8 bg-[#FFFFFF]"
    >
      <Link href={'/'}>
        {/* <Image src="/logo.png" width={'100px'} /> */}
        <Heading ml={-4} color={'primary'} as="h2" size="lg">
          Hostel
        </Heading>
      </Link>

      <HStack>
        <Button
          border={'2px'}
          borderColor={'gray.300'}
          borderRadius={50}
          variant="outline"
        >
          {/* Tenant */}
          {/* <Text fontWeight={'light'}>List Your Property</Text> */}
          {/* User */}
          <Text fontWeight={'light'}>Transaction</Text>
        </Button>

        <Menu>
          <MenuButton>
            <UserCircle className="text-primary" size={50} weight="duotone" />
          </MenuButton>
          <MenuList>
            <MenuItem color={'primary'}>
              <SignOut size={32} />
              <Text ml={3} fontSize="lg" fontWeight={'semibold'}>
                LogOut
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
}
