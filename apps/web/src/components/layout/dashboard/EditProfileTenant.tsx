'use client';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import * as Yup from 'yup';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { updateDataProfile } from '@/api/profile';
import ChangeEmailTenantModal from './changeEmailTenant';

interface EditProfileProps {
  onOpen: () => void;
  onOpenEmail: () => void;
}

const validationSchema = Yup.object({
  username: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  brithday: Yup.date().required('Required'),
});

export default function EditProfileTenant({ onOpen }: EditProfileProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [userId, setUserId] = useState<any | null>(null);
  const toast = useToast();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    const storedUserId = Cookies.get('userId');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserId(storedUserId);
    }
  }, []);

  const initialValues = {
    username: user?.username || '',
    gender: user?.gender || '',
    email: user?.email || '',
    brithday: user?.brithday ? user.brithday.split('T')[0] : '',
  };

  const handleSave = async (values: typeof initialValues) => {
    try {
      const { username, gender, email, brithday } = values;
      const response = await updateDataProfile(
        userId,
        email,
        username,
        gender,
        brithday,
      );
      toast({
        title: 'Update profile succesfuly',
        status: 'success',
        position: 'top',
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to update profile',
        status: 'error',
        position: 'top',
        isClosable: true,
      });
    }
    setUser(values);
    Cookies.set('user', JSON.stringify(values));
    setIsEdit(false);
  };

  const isEmailLogin = Cookies.get('login method') !== 'google';

  return (
    <div>
      {!isEdit ? (
        <VStack>
          <Text fontSize="2xl" mt={4}>
            {user?.username}
          </Text>
          <Text fontSize="lg" color="gray.500">
            {user?.email}
          </Text>
        </VStack>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {({ isSubmitting }) => (
            <Form>
              <VStack mt={4} spacing={4}>
                <FormControl>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Field as={Input} id="username" name="username" />
                  <ErrorMessage name="username" component={FormErrorMessage} />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="gender">Gender</FormLabel>
                  <Field as={Input} id="gender" name="gender" />
                  <ErrorMessage name="gender" component={FormErrorMessage} />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Field as={Input} id="email" name="email" />
                  <ErrorMessage name="email" component={FormErrorMessage} />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="brithday">brithday</FormLabel>
                  <Field as={Input} type="date" id="brithday" name="brithday" />
                  <ErrorMessage name="brithday" component={FormErrorMessage} />
                </FormControl>
              </VStack>
              <HStack gap={8} mt={4}>
                <Button
                  w={200}
                  colorScheme="green"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  w={200}
                  colorScheme="red"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </Button>
              </HStack>
            </Form>
          )}
        </Formik>
      )}
      <HStack gap={8}>
        {!isEdit && (
          <HStack flexWrap={'wrap'} justifyContent={'center'} gap={8} mt={4}>
            {isEmailLogin && (
              <Button w={200} colorScheme="gray" onClick={onOpen}>
                Change Password
              </Button>
            )}
            {isEmailLogin && (
              <Button
                w={200}
                colorScheme="gray"
                onClick={() => setIsEmailModalOpen(true)}
              >
                Change Email
              </Button>
            )}
          </HStack>
        )}
      </HStack>
      <ChangeEmailTenantModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
}
