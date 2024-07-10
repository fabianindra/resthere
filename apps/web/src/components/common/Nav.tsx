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
  const {
    isOpen: isUserModalOpen,
    onOpen: onOpenUserModal,
    onClose: onCloseUserModal,
  } = useDisclosure();
  const {
    isOpen: isTenantModalOpen,
    onOpen: onOpenTenantModal,
    onClose: onCloseTenantModal,
  } = useDisclosure();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const username = urlParams.get('username');
    const email = urlParams.get('email');
    const roleGoogle = urlParams.get('role');
    const idGoogle = urlParams.get('userId');
    const id = urlParams.get('userId');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }

    if (token) {
      Cookies.set('token', token, { expires: 1 });
      Cookies.set('user', JSON.stringify({ id, username, email }), { expires: 1 });
      Cookies.set('role', String(roleGoogle).toLowerCase(), { expires: 1 });
      Cookies.set('id', String(idGoogle), { expires: 1 });
      window.location.href = '/';
    }

    if (idGoogle) {
      Cookies.set('login method', "google", { expires: 1 })
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    Cookies.remove('role');
    Cookies.remove('login method');
    setLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };

  return (
    <Box className="w-full z-50 shadow-sm">
      <HStack
        className=" w-full shadow-sm bg-white"
        justifyContent="space-between"
        px={{ base: '32px', md: '32px', lg: '64px' }}
        py={8}
      >
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
