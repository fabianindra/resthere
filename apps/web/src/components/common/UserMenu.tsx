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
import { UserMenuProps } from '@/types';
import Cookies from 'js-cookie';

const UserMenu: React.FC<UserMenuProps> = ({
  loggedIn,
  user,
  onOpen,
  handleLogout,
}) => {
  const roleCookies = String(Cookies.get('role'));
  const roleWithoutQuotes = roleCookies.slice(1, -1);

  return (
    <Menu>
      <MenuButton>
        <HStack>
          <UserCircle className="text-primary" size={50} weight="duotone" />
          {loggedIn && user && (
            <Text fontWeight={'semibold'}>{user.username}</Text>
          )}
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
        {roleWithoutQuotes == 'user' ||
          (roleCookies == 'user' && (
            <Link href="/profile">
              <MenuItem color={'primary'}>
                <Table size={32} />
                <Text ml={3} fontSize="lg" fontWeight={'semibold'}>
                  Profile
                </Text>
              </MenuItem>
            </Link>
          ))}
        {roleCookies == 'tenant' && (
          <Link href="/dashboard">
            <MenuItem color={'primary'}>
              <Table size={32} />
              <Text ml={3} fontSize="lg" fontWeight={'semibold'}>
                Dashboard
              </Text>
            </MenuItem>
          </Link>
        )}
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
