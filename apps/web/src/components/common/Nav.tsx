'use client'
import React, { useState, useEffect } from 'react';
import { HStack, useDisclosure } from '@chakra-ui/react';
import { User } from '@/types';
import LoginModal from './LoginModal';
import UserMenu from './UserMenu';
import Header from './Header';
import Cookies from 'js-cookie';

export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loggedIn, setLoggedIn] = useState(false);
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
    localStorage.removeItem('user'); // Remove stored user data
    Cookies.remove('token');
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <div style={{ zIndex: 999 }}>
      <Header />
      <HStack justifyContent="space-between" pr={20} pt={8}>
        <HStack spacing={4}> {/* Adjust spacing as needed */}
          {/* Add other navigation components here */}
        </HStack>
        <UserMenu loggedIn={loggedIn} user={user} onOpen={onOpen} handleLogout={handleLogout} />
      </HStack>
      <LoginModal isOpen={isOpen} onClose={onClose} setLoggedIn={setLoggedIn} setUser={setUser} />
    </div>
  );
}
