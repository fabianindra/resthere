'use client';

import { VStack, Box, Text, Button, Avatar, useToast } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';

import { User } from '@/types';
import Cookies from 'js-cookie';
import { verifyTokenClient } from '../verifyToken';
import { useDisclosure } from '@chakra-ui/react';
import ChangePasswordModal from '@/components/layout/profile/changePassword';
import EditProfile from '@/components/layout/profile/EditProfile';
import EditFotoProfile from '@/components/layout/profile/EditFotoProfile';
import BookingList from '@/components/layout/profile/bookingList';

export default function ProfilePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [verified, setVerified] = useState<boolean | null>(null);
  const toast = useToast();
  const hasRedirected = useRef(false);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
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

  if (!loggedIn || verified === false) {
    return (
      <Box>
        <VStack mt={100} mb={200}>
          <Text>You need to log in to view your profile.</Text>
        </VStack>
      </Box>
    ); 
  }

  return (
    <Box className="z-50">
      <VStack align="stretch" pr={20} pt={8} spacing={8}>
        <Box borderWidth="1px" borderRadius="lg" p={6}>
          <Avatar size="xl" name={user?.username} />
          <Text fontSize="2xl" mt={4}>
            {user?.username}
          </Text>
          <Text fontSize="lg" color="gray.500">
            {user?.email}

          </Text>
          <Button mt={4} colorScheme="teal" onClick={handleLogout}>
            Logout
          </Button>
          <Button mt={4} colorScheme="blue" onClick={onOpen}>
            Change Password
          </Button>
        </Box>
        <BookingList />
        <ChangePasswordModal isOpen={isOpen} onClose={onClose} />
      </VStack>
    </Box>
  );
}
