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
  onOpenUserModal,
  onOpenTenantModal,
  handleLogout,
}) => {
  const roleCookies = Cookies.get('role');

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
          <>
            <MenuItem color={'primary'} onClick={onOpenUserModal}>
              <SignIn size={32} />
              <Text ml={3} fontSize="lg" fontWeight={'semibold'}>
                Log In as User
              </Text>
            </MenuItem>
            <MenuItem color={'primary'} onClick={onOpenTenantModal}>
              <SignIn size={32} />
              <Text ml={3} fontSize="lg" fontWeight={'semibold'}>
                Log In as Tenant
              </Text>
            </MenuItem>
          </>
        ) : (
          <MenuItem color={'primary'} onClick={handleLogout}>
            <SignOut size={32} />
            <Text ml={3} fontSize="lg" fontWeight={'semibold'}>
              Log Out
            </Text>
          </MenuItem>
        )}
        {loggedIn && roleCookies === 'user' && (
          <Link href="/profile">
            <MenuItem color={'primary'}>
              <Table size={32} />
              <Text ml={3} fontSize="lg" fontWeight={'semibold'}>
                Profile
              </Text>
            </MenuItem>
          </Link>
        )}
        {loggedIn && roleCookies === 'user' && (
          <Link href="/transaction">
            <MenuItem color={'primary'}>
              <Table size={32} />
              <Text ml={3} fontSize="lg" fontWeight={'semibold'}>
                Transaction
              </Text>
            </MenuItem>
          </Link>
        )}
        {loggedIn && roleCookies === 'tenant' && (
          <Link href="/dashboard">
            <MenuItem color={'primary'}>
              <Table size={32} />
              <Text ml={3} fontSize="lg" fontWeight={'semibold'}>
                Property Management
              </Text>
            </MenuItem>
          </Link>
        )}
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
