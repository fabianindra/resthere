'use client';

import { VStack, Box, Text, Button, Avatar } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { User } from '@/types';
import Cookies from 'js-cookie';
import { verifyTokenClient } from '../verifyToken';
import Link from 'next/link';

export default function ProfilePage() {
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
                setVerified(isValidToken)
                //check verified
                console.log(isValidToken)

            } catch (error) {
                console.error("Error verifying token:", error);
                setVerified(false);
            }
        };
        verifyAndSet();
    }, []);

  const handleLogout = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    Cookies.remove('role')
    setLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };

if (!verified) {
    return (
        <div>
          <VStack mt={100} mb={200}>
            <Text>You are not authorized. Please log in to access this page.</Text>
            <Link href="/">Go to Home Page</Link>
          </VStack>
        </div>
    );
  } 
  
return (
    <div className="z-50">
      <VStack align="stretch" pr={20} pt={8} spacing={8}>
        {loggedIn && user ? (
          <Box borderWidth="1px" borderRadius="lg" p={6}>
            <Avatar size="xl" name={user.username} />
            <Text fontSize="2xl" mt={4}>{user.username}</Text>
            <Text fontSize="lg" color="gray.500">{user.email}</Text>
            <Button mt={4} colorScheme="teal" onClick={handleLogout}>Logout</Button>
          </Box>
        ) : (
          <Text fontSize="xl" textAlign="center" marginTop={100} marginBottom={150}>You need to log in to view your profile.</Text>
        )}
      </VStack>
    </div>
  );
}
