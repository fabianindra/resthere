'use client';

import { Box, HStack, useDisclosure } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { User } from '@/types';
import LoginModal from './LoginModal';
import LoginTenantModal from './LoginTenantModal';
import Header from './Header';
import Cookies from 'js-cookie';
import UserMenu from './UserMenu';

export default function Nav() {
  const { isOpen: isUserModalOpen, onOpen: onOpenUserModal, onClose: onCloseUserModal } = useDisclosure();
  const { isOpen: isTenantModalOpen, onOpen: onOpenTenantModal, onClose: onCloseTenantModal } = useDisclosure();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const username = urlParams.get('username');
    const email = urlParams.get('email');
    const roleGoogle = urlParams.get('role');

    console.log(Cookies.get('role'));

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }

    if (token) {
      Cookies.set('token', token);
      Cookies.set('user', JSON.stringify({ username, email }));
      Cookies.set('role', String(roleGoogle).toLowerCase());
      window.location.href = '/';
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    Cookies.remove('role');
    setLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };

  return (
    <Box className="z-50">
      <HStack justifyContent="space-between" pr={20} pt={8}>
      <Header
          loggedIn={loggedIn}
          user={user}
          onOpenUserModal={onOpenUserModal}
          onOpenTenantModal={onOpenTenantModal}
          handleLogout={handleLogout}
        />
        <UserMenu
          loggedIn={loggedIn}
          user={user}
          onOpenUserModal={onOpenUserModal}
          onOpenTenantModal={onOpenTenantModal}
          handleLogout={handleLogout}
        />
      </HStack>
      <LoginModal
        isOpen={isUserModalOpen}
        onClose={onCloseUserModal}
        setLoggedIn={setLoggedIn}
        setUser={setUser}
      />
      <LoginTenantModal
        isOpen={isTenantModalOpen}
        onClose={onCloseTenantModal}
        setLoggedIn={setLoggedIn}
        setUser={setUser}
      />
    </Box>
  );
}
