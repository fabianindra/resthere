import React, { useState, useEffect } from 'react';
import {
  Button, Input, FormControl, FormLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, Text
} from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { apiUrl } from '@/api';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeEmailModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {setToken(token)};
  }, []);


  useEffect(() => {
    const userRole = Cookies.get('role');
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  const handleRequestReset = async () => {
    try {
      const response = await axios.post(`${apiUrl}/auth/reset-email`, { email, role, newEmail });
      if (response.data.success) {
        setSuccess(true);
        setError('');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to send reset email');
    }
  };

  const handleClose = () => {
    setEmail('');
    setRole(Cookies.get('role') || 'user');
    setSuccess(false);
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Your Email</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!success ? (
            <>
              {error && <Text color="red.500" mb={4}>{error}</Text>}
              <FormControl id="email" mb={4}>
                <FormLabel>Old Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormLabel>New Email</FormLabel>
                <Input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </FormControl>
            </>
          ) : (
            <Text color="green.500" textAlign="center">
              A link to verified your new email has been sent to your new email.
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          {!success ? (
            <Button colorScheme="blue" onClick={handleRequestReset}>Send Reset Link</Button>
          ) : (
            <Button colorScheme="blue" onClick={handleClose}>Close</Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangeEmailModal;
