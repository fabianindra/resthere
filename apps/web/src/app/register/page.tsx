'use client'
import React, { useState } from 'react';
import {
  Button,
  VStack,
  Text,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Container,
  Box,
  Switch,
} from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTenant, setIsTenant] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      let response;
      const payload = {
        username,
        email,
        password,
      };
      if (isTenant) {
        response = await axios.post('http://localhost:6570/api/auth/register-tenant', payload);
      } else {
        response = await axios.post('http://localhost:6570/api/auth/register-user', payload);
      }
      if (response.data.success) {
        console.log('Registration successful', response);
        setSuccess(true);
        setError('');
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (error:any) {
      console.error('Registration error:', error);
      setError('Registration failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Container maxW="md" py={12}>
      {!success && (
        <Box
          p={8}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          bg="white"
        >
          <Heading mb={6} textAlign="center" color={'primary'}>
            Register
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
          <FormControl id="email" mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <FormControl display="flex" alignItems="center" mb={4} marginTop={5}>
            <FormLabel htmlFor="tenant" mb="0">
              User
            </FormLabel>
            <Switch id="tenant" isChecked={isTenant} onChange={() => setIsTenant(!isTenant)} />
            <FormLabel htmlFor="tenant" mb="0" marginLeft={3}>
              Tenant
            </FormLabel> 
          </FormControl>
          <VStack spacing={4} marginTop={12}>
            <Button colorScheme="blue" onClick={handleRegister}>
              Register
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Cancel
            </Button>
          </VStack>
        </Box>
      )}
      {success && (
        <VStack>
          <Text color="green.500" textAlign="center">Registration successful</Text>
          <Link href="/">Go to Home</Link>
        </VStack>
      )}
    </Container>
  );
}
