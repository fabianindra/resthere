import { imageUrl } from '@/api';
import { updateFotoProfile } from '@/api/profile';
import { Avatar, Box, Button, Input, VStack, useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React, { useRef, useState } from 'react';

export default function EditFotoProfile(foto: any) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const toast = useToast();

  const uploadFoto = async (file: any) => {
    const storedUserId: any = Cookies.get('userId');
    try {
      const data = await updateFotoProfile(parseInt(storedUserId), file);
      toast({
        title: 'Update foto profile succesfuly',
        status: 'success',
        position: 'top',
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to update foto profile',
        status: 'error',
        position: 'top',
        isClosable: true,
      });
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      uploadFoto(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <VStack justifyContent={'center'}>
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <>
        <Avatar
          size="xl"
          src={preview ? preview : `${imageUrl}/${foto.foto}`}
        />
      </>
      <Button w={200} colorScheme="gray" onClick={handleUploadClick}>
        Ubah Foto
      </Button>
    </VStack>
  );
}
