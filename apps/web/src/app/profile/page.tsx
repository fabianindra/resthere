'use client';

import { VStack, Center, Text, HStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { User } from '@/types';
import Cookies from 'js-cookie';
import { verifyTokenClient } from '../verifyToken';
import Link from 'next/link';
import { useDisclosure } from '@chakra-ui/react';
import ChangePasswordModal from '@/components/layout/profile/changePassword';
import ChangeEmailModal from '@/components/layout/profile/changeEmail';
import EditProfile from '@/components/layout/profile/EditProfile';
import EditFotoProfile from '@/components/layout/profile/EditFotoProfile';

export default function ProfilePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEmailOpen, onOpen: onOpenEmail, onClose: onCloseEmail } = useDisclosure();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [verified, setVerified] = useState(false);
  const [role, setRole] = useState('');

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

  if (verified == null || role == null) {
    return (
      <Center mt={100} mb={200}>
        <Text>Loading...</Text>
      </Center>
    );
  }

  if (!loggedIn || !verified || role !== 'user') {
    return (
      <VStack mt={100} mb={200}>
        <Text>You are not authorized. Please log in to access this page.</Text>
        <Link href="/">Go to Home Page</Link>
      </VStack>
    );
  }

  return (
    <HStack mx={'auto'} my={20}>
      <VStack className="w-full" mx={'auto'} align="stretch" spacing={8}>
        {loggedIn && user ? (
          <VStack p={6}>
            <EditFotoProfile foto={user.foto} />
            <EditProfile onOpen={onOpen} onOpenEmail={onOpenEmail} />
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
      <ChangePasswordModal isOpen={isOpen} onClose={onClose} />
      <ChangeEmailModal isOpen={isEmailOpen} onClose={onCloseEmail} />
    </HStack>
  );
}
