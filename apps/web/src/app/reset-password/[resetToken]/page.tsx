'use client'
import React, { useState, useEffect } from 'react';
import { Button, Text, Heading, Input, FormControl, FormLabel, Container, Box } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { User } from '@/types';
import { apiUrl } from '@/api';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const tokenFromURL = url.pathname.split('/').pop();
      setToken(tokenFromURL || '');
      
      const emailCookie = Cookies.get('user');
      if (emailCookie) {
        try {
          const parsedUser = JSON.parse(emailCookie);
          setEmail(parsedUser.email);
        } catch (error) {
          console.error('Error parsing user from cookie:', error);
        }
      }

      const roleCookie = Cookies.get('role');
      if (roleCookie) {
        setRole(roleCookie);
      } else {
        setError('Invalid or missing token');
      }
    }
  }, []);


  const logoutAndRedirect = async () => {
    try {
      Cookies.remove('token');
      Cookies.remove('user');
      Cookies.remove('role');
      Cookies.remove('login method');
      setLoggedIn(false);
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  useEffect(() => {
    if (success) {
      logoutAndRedirect();
    }
  }, [success]);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    const payload = { newPassword, role, email, token };

    try {
      const response = await axios.post(`${apiUrl}/auth/reset-password`, payload);
      setLoading(false);
      if (response.data.success) {
        setSuccess(true);
        setError('');
      } else {
        setError(response.data.message);
      }
    } catch (err:any) {
      setLoading(false);
      setError('Failed to reset password');
      console.error('Error response:', err.response);
    }
  };

  return (
    <Container maxW="md" py={12}>
      {!success ? (
        <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg" bg="white">
          <Heading mb={6} textAlign="center">
            Reset Password
          </Heading>
          {error && <Text color="red.500" mb={4}>{error}</Text>}
          <FormControl id="newPassword" mb={4}>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="confirmPassword" mb={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handleResetPassword} isLoading={loading}>
            Reset Password
          </Button>
        </Box>
      ) : (
        <Text>Success! Your password has been reset.</Text>
      )}
    </Container>
  );
}
