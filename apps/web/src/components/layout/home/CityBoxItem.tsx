import { Box, Text, Image } from '@chakra-ui/react';
import { MapPinArea } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

export default function CityBoxItem({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  return (
    <Box className="flex flex-col w-full h-full p-4 box-border">
      <Image src={url} alt={title} className="rounded-xl w-full" />
      <Box mt={-10} ml={4} className="flex items-end text-travertine">
        {title ? (
          <>
            <MapPinArea size={32} weight="fill" />
            <Text ml={2} fontSize="md" fontWeight={'semibold'}>
              {title}
            </Text>
          </>
        ) : null}
      </Box>
    </Box>
  );
}
