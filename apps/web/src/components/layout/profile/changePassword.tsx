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
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const userData = Cookies.get('user');
  const parsedUserData = userData ? JSON.parse(userData) : null;
  const email = parsedUserData?.email;

  const handleChangePassword = async () => {
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    const isConfirmed = window.confirm(
      'Are you sure you want to change your password?',
    );
    if (!isConfirmed) {
      return;
    }

    try {
      const role = Cookies.get('role');
      const apiEndpoint =
        role == 'tenant'
          ? 'http://localhost:6570/api/auth/change-password-tenant'
          : 'http://localhost:6570/api/auth/change-password-user';

      const response = await axios.post(apiEndpoint, {
        email,
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        setSuccess('Password changed successfully.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        onClose();
      } else {
        setError(response.data.message || 'Failed to change password.');
      }
    } catch (err) {
      setError('An error occurred while changing the password.');
      console.error(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="current-password" isRequired>
            <FormLabel>Current Password</FormLabel>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="new-password" isRequired mt={4}>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="confirm-password" isRequired mt={4}>
            <FormLabel>Confirm New Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          {error && <FormErrorMessage mt={4}>{error}</FormErrorMessage>}
          {success && (
            <Text color="green.500" mt={4}>
              {success}
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleChangePassword}>
            Change Password
          </Button>
          <Button onClick={onClose} ml={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordModal;
