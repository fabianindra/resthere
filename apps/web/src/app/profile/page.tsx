'use client';

import { VStack, Box, Text, HStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { User } from '@/types';
import Cookies from 'js-cookie';
import { verifyTokenClient } from '../verifyToken';
import Link from 'next/link';
import { useDisclosure } from '@chakra-ui/react';
import ChangePasswordModal from '@/components/layout/profile/changePassword';
import EditProfile from '@/components/layout/profile/EditProfile';
import EditFotoProfile from '@/components/layout/profile/EditFotoProfile';
import BookingList from '@/components/layout/profile/bookingList';

export default function ProfilePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const verifyAndSet = async () => {
      try {
        const isValidToken = await verifyTokenClient();
        setVerified(isValidToken);
      } catch (error) {
        console.error('Error verifying token:', error);
        setVerified(false);
      }
    };
    verifyAndSet();
  }, []);

  if (!verified) {
    return (
      <Box>
        <VStack mt={100} mb={200}>
          <Text>
            You are not authorized. Please log in to access this page.
          </Text>
          <Link href="/">Go to Home Page</Link>
        </VStack>
      </Box>
    );
  }

  return (
    <HStack className="w-full">
      <VStack className="w-full" mx={16} align="stretch" spacing={8}>
        {loggedIn && user ? (
          <VStack borderWidth="1px" borderRadius="lg" p={6}>
            <EditFotoProfile foto={user.username} />
            <EditProfile onOpen={onOpen} />
          </VStack>
        ) : (
          <Text
            fontSize="xl"
            textAlign="center"
            marginTop={100}
            marginBottom={150}
          >
            You need to log in to view your profile.
          </Text>
        )}
      </VStack>
      <BookingList /> 
      <ChangePasswordModal isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
}
