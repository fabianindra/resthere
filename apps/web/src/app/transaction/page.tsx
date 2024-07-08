'use client';

import { VStack, Box, Text, Button, Avatar, useToast } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import { User } from '@/types';
import Cookies from 'js-cookie';
import { verifyTokenClient } from '../verifyToken';
import { useDisclosure } from '@chakra-ui/react';
import BookingList from '@/components/layout/profile/bookingList';

export default function TransactionPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState('');
  const [verified, setVerified] = useState<boolean | null>(null);
  const toast = useToast();
  const hasRedirected = useRef(false);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    const storedRole = Cookies.get('role');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    if (storedRole) {
      setRole(storedRole);
    } else {
      setRole('');
    }
  }, []);

  useEffect(() => {
    const verifyAndSet = async () => {
      try {
        const isValidToken = await verifyTokenClient();
        setVerified(isValidToken);
        if (!isValidToken && !hasRedirected.current) {
          hasRedirected.current = true;
          toast({
            title: 'Unauthorized',
            description: 'You are not authorized to access this page.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          setTimeout(() => {
            window.location.href = '/';
          }, 5000);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setVerified(false);
        if (!hasRedirected.current) {
          hasRedirected.current = true;
          toast({
            title: 'Error',
            description: 'There was an error verifying your session.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          setTimeout(() => {
            window.location.href = '/';
          }, 5000);
        }
      }
    };
    verifyAndSet();
  }, [toast]);

  const handleLogout = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    Cookies.remove('role');
    setLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };

  if (verified === null) {
    return (
      <Box>
        <VStack mt={100} mb={200}>
          <Text>Loading...</Text>
        </VStack>
      </Box>
    );
  }

  if (!loggedIn || verified === false || role !== 'user') {
    return (
      <Box>
        <VStack mt={100} mb={200}>
          <Text>You need to log in as user to view transaction.</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box className="z-50">
      <VStack align="stretch" pr={{ base: 0, sm: 20 }} pt={8} spacing={8}>
        <BookingList />
      </VStack>
    </Box>
  );
}
