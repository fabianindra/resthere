'use client';

import { HStack, useDisclosure } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { User } from '@/types';
import LoginModal from './LoginModal';
import Header from './Header';
import Cookies from 'js-cookie';

export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const username = urlParams.get('username');
    const email = urlParams.get('email');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ username, email }));
      setLoggedIn(true);
      window.location.href = '/';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    Cookies.remove('token');
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <div className='z-50'>
      <Header
        loggedIn={loggedIn}
        user={user}
        onOpen={onOpen}
        handleLogout={handleLogout}
      />
      <HStack justifyContent="space-between" pr={20} pt={8}>
        <HStack spacing={4}>
          {' '}
        </HStack>
      </HStack>
      <LoginModal
        isOpen={isOpen}
        onClose={onClose}
        setLoggedIn={setLoggedIn}
        setUser={setUser}
      />
    </div>
  );
}
