'use client';

import { VStack, Box, Text, HStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { User } from '@/types';
import Cookies from 'js-cookie';
import { verifyTokenClient } from '@/app/verifyToken';
import Link from 'next/link';
import { useDisclosure } from '@chakra-ui/react';
import ChangePasswordModal from '@/components/layout/profile/changePassword';
import EditProfileTenant from './EditProfileTenant';
import EditFotoProfile from '@/components/layout/profile/EditFotoProfile';

export default function TenantProfile() {
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

  const onOpenEmail = () => {
    // console.log('Email open handler');
  };

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
    <HStack mx={'auto'} my={20}>
      <VStack className="w-full" spacing={8}>
        {loggedIn && user ? (
          <VStack p={6}>
            <EditFotoProfile foto={user.foto} />
            <EditProfileTenant onOpen={onOpen} onOpenEmail={onOpenEmail} />
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
    </HStack>
  );
}
