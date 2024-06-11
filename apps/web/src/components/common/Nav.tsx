'use client'

import React, { useState, useEffect } from 'react';
import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
} from '@chakra-ui/react';
import { SignOut, UserCircle, SignIn, Table } from '@phosphor-icons/react';
import Link from 'next/link';
import axios from 'axios';
import { User } from '@/types';
import Cookies from 'js-cookie';

export default function Nav () {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const username = urlParams.get('username')
    const email = urlParams.get('email')

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }
    
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ username, email }));
      setLoggedIn(true);
      window.location.href = '/';
    }
  }, []);
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:6570/api/auth/login', {
        email,
        password,
      });
      
      if (response.data) {
        const userData = response.data.data;
        const userToken = response.data.token;
        localStorage.setItem('user', JSON.stringify(userData)); // Store user data
        Cookies.set('token', userToken, { expires: 1 });
        console.log('Login successful', response.data);
        setLoggedIn(true);
        setUser(userData)
        setError(''); 
        onClose();
      } else {
        setError('Login failed: Invalid response data');
      }
    } catch (error:any) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove stored user data
    Cookies.remove('token');
    setLoggedIn(false);
    setUser(null);
  };

  const handleGoogleLogin = async () => {
    window.location.href = 'http://localhost:6570/api/auth/google';
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleLinkClick = () => {
    handleCloseModal();
  };

  return (
    <div style={{ zIndex: 999 }}>
      <HStack justifyContent={'space-between'} className="sticky px-20 py-8 bg-[#FFFFFF]">
        <HStack>
          <Link href={"/"}>
            <Heading ml={-4} color={'primary'} as="h2" size="lg">
              Hostel
            </Heading>
          </Link>
        </HStack>

        <HStack>
          <Button border={'2px'} borderColor={'gray.300'} borderRadius={50} variant="outline">
            <Text fontWeight={'light'}>Transaction</Text>
          </Button>
          <Link href={"/register"}>
            <Button border={'2px'} borderColor={'gray.300'} borderRadius={50} variant="outline">
              <Text fontWeight={'light'}>Register</Text>
            </Button>
          </Link>
          
          <Menu>
            <MenuButton>
              <HStack>
                <UserCircle className="text-primary" size={50} weight="duotone" />
                {loggedIn && user && <Text fontWeight={'semibold'}>{user.username}</Text>}
              </HStack>
            </MenuButton>
            <MenuList>
              {!loggedIn ? (
                <MenuItem color={'primary'} onClick={onOpen}>
                  <SignIn size={32} />
                  <Text ml={3} fontSize="lg" fontWeight={'semibold'}>
                    Log In
                  </Text>
                </MenuItem>
              ) : (
                <MenuItem color={'primary'} onClick={handleLogout}>
                  <SignOut size={32} />
                  <Text ml={3} fontSize="lg" fontWeight={'semibold'}>
                    Log Out
                  </Text>
                </MenuItem>
              )}
              <Link href={"/dashboard"}>
                <MenuItem color={'primary'}>
                  <Table size={32} />
                  <Text ml={3} fontSize="lg" fontWeight={'semibold'}>
                    Dashboard
                  </Text>
                </MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>

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
              <Button variant="link" colorScheme="blue" ml={3} onClick={handleLinkClick}>
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
    </div>
  );
}
