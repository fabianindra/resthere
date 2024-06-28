'use client'

import React, { useState, useEffect } from 'react';
import { Button, VStack, Text, Heading, Input, FormControl, FormLabel, Container, Box } from '@chakra-ui/react';
import axios from 'axios';

export default function CompleteRegister() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEmail(params.get('email') || '');
    //console.log(email)
  }, []);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const payload = {
        username,
        email,
        password,
      };
      const response = await axios.post('http://localhost:6570/api/auth/register-tenant-complete', payload);
      if (response.data.success) {
        setSuccess(true);
        setError('');
        window.location.href = '/'; // Redirect to the dashboard or home page
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (error: any) {
      setError('Registration failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Container maxW="md" py={12}>
      {!success && (
        <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg" bg="white">
          <Heading mb={6} textAlign="center" color={'primary'}>
            Complete Registration
          </Heading>
          {error && <Text color="red.500" mb={4}>{error}</Text>}
          <FormControl id="username" mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <VStack spacing={4} marginTop={12}>
            <Button colorScheme="blue" onClick={handleRegister}>
              Register
            </Button>
          </VStack>
        </Box>
      )}
      {success && (
        <VStack>
          <Text color="green.500" textAlign="center">Registration successful</Text>
        </VStack>
      )}
    </Container>
  );
}
