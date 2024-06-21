import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { User } from '@/types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  setLoggedIn: (status: boolean) => void;
  setUser: (user: User | null) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  setLoggedIn,
  setUser,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:6570/api/auth/login',
        {
          email,
          password,
        },
      );

      if (response.data) {
        const userData = response.data.data;
        const userToken = response.data.token;
        const userRole = response.data.role;
        console.log(userData);
        Cookies.set('user', JSON.stringify(userData));
        Cookies.set('token', userToken, { expires: 1 });
        Cookies.set('role', userRole, { expires: 1 });
        console.log('Login successful', response.data);
        setLoggedIn(true);
        setUser(userData);
        setError('');
        onClose();
      } else {
        setError('Login failed: Invalid response data');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  const handleGoogleLogin = async () => {
    window.location.href = 'http://localhost:6570/api/auth/google';
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log In</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {error && <Text color="red.500">{error}</Text>}
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleLogin}>
            Log In
          </Button>
          <Link href="/register" passHref>
            <Button
              variant="link"
              colorScheme="blue"
              ml={3}
              onClick={handleCloseModal}
            >
              Register
            </Button>
          </Link>
          <Button variant="ghost" onClick={handleCloseModal}>
            Cancel
          </Button>
        </ModalFooter>
        <ModalFooter>
          <Button
            mt={4}
            w="full"
            colorScheme="blue"
            onClick={handleGoogleLogin}
          >
            Google
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
