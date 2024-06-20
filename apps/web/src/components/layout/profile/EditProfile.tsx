'use client';

import { Button, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { User } from '@/types';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface EditProfileProps {
  onOpen: () => void;
}

export default function EditProfile({ onOpen }: EditProfileProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [editedUser, setEditedUser] = useState<any | null>(null);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setEditedUser(parsedUser);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (editedUser) {
      setUser(editedUser);
      Cookies.set('user', JSON.stringify(editedUser));
      setIsEdit(false);
    }
  };

  return (
    <div>
      {!isEdit ? (
        <VStack>
          <Text fontSize="2xl" mt={4}>
            {user?.username}
          </Text>
          <Text fontSize="lg" color="gray.500">
            {user?.gender || null}
          </Text>
          <Text fontSize="lg" color="gray.500">
            {user?.email}
          </Text>
          <Text fontSize="lg" color="gray.500">
            {user?.brithday || null}
          </Text>
        </VStack>
      ) : (
        <VStack mt={4}>
          <Input
            name="username"
            value={editedUser?.username || ''}
            onChange={handleInputChange}
            size="lg"
            placeholder="Username"
          />
          <Input
            name="gender"
            value={editedUser?.gender || ''}
            onChange={handleInputChange}
            size="lg"
            placeholder="Gender"
          />
          <Input
            name="email"
            value={editedUser?.email || ''}
            onChange={handleInputChange}
            size="lg"
            placeholder="Email"
          />
          <Input
            type="date"
            name="brithday"
            value={
              editedUser?.brithday ? editedUser.brithday.split('T')[0] : ''
            }
            onChange={handleInputChange}
            size="lg"
            placeholder="brithday"
          />
        </VStack>
      )}
      <HStack gap={8}>
        {isEdit ? (
          <>
            <Button w={200} mt={4} colorScheme="green" onClick={handleSave}>
              Save
            </Button>
            <Button
              w={200}
              mt={4}
              colorScheme="red"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            w={200}
            mt={4}
            colorScheme="gray"
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </Button>
        )}
        <Button w={200} mt={4} colorScheme="gray" onClick={onOpen}>
          Change Password
        </Button>
      </HStack>
    </div>
  );
}
