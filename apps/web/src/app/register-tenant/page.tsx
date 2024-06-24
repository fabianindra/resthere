'use client'

import React, { useState } from 'react';
import { Button, VStack, Text, Heading, Input, FormControl, FormLabel, Container, Box } from '@chakra-ui/react';
import axios from 'axios';

export default function InitialRegister() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleEmailSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:6570/api/auth/register-tenant', { email });
      if (response.data.success) {
        setSuccess(true);
        setError('');
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
            Tenant Register with Email
          </Heading>
          {error && <Text color="red.500" mb={4}>{error}</Text>}
          <FormControl id="email" mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <VStack spacing={4} marginTop={12}>
            <Button colorScheme="blue" onClick={handleEmailSubmit}>
              Submit Email
            </Button>
          </VStack>
        </Box>
      )}
      {success && (
        <VStack>
          <Text color="green.500" textAlign="center">Please check your email to verify your account.</Text>
        </VStack>
      )}
    </Container>
  );
}
