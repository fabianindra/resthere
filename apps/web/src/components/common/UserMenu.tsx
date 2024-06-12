import React from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  HStack,
  Text,
} from '@chakra-ui/react';
import { SignOut, UserCircle, SignIn, Table } from '@phosphor-icons/react';
import Link from 'next/link';
import { User } from '@/types';

interface UserMenuProps {
  loggedIn: boolean;
  user: User | null;
  onOpen: () => void;
  handleLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ loggedIn, user, onOpen, handleLogout }) => {
  return (
    <Menu>
      <MenuButton>
        <HStack>
          <UserCircle className="text-primary" size={50} weight="duotone" />
          {loggedIn && user && <Text fontWeight={'semibold'}>{user.username}</Text>}
        </HStack>
      </MenuButton>
      <MenuList>
        {!loggedIn ? (
          <MenuItem color={'primary'} onClick={onOpen}>
            <SignIn size={32} />
            <Text ml={3} fontSize="lg" fontWeight={'semibold'}>
              Log In
            </Text>
          </MenuItem>
        ) : (
          <MenuItem color={'primary'} onClick={handleLogout}>
            <SignOut size={32} />
            <Text ml={3} fontSize="lg" fontWeight={'semibold'}>
              Log Out
            </Text>
          </MenuItem>
        )}
        <Link href={"/dashboard"}>
          <MenuItem color={'primary'}>
            <Table size={32} />
            <Text ml={3} fontSize="lg" fontWeight={'semibold'}>
              Dashboard
            </Text>
          </MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
