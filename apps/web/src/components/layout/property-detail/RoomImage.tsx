import { Image } from '@chakra-ui/react';
import React from 'react';
import { imageUrl } from '@/api';

export function RoomImage({ image }: { image: string }) {
  return (
    <Image
      src={
        image
          ? `${imageUrl}/${image}`
          : `https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80`
      }
      alt="Green double couch with wooden legs"
      borderRadius="lg"
    />
  );
}
