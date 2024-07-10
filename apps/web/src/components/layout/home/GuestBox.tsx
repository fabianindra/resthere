import React from 'react';
import { Box, Text, HStack, Heading, Show, Hide } from '@chakra-ui/react';
import { Minus, Plus, UsersThree } from '@phosphor-icons/react/dist/ssr';

const GuestBox = ({ guestCount, set }: any) => {
  const handleAdd = () => {
    guestCount > 0 && guestCount < 10 ? set(guestCount + 1) : guestCount;
  };

  const handleMinus = () => {
    guestCount > 1 ? set(guestCount - 1) : guestCount;
  };
  return (
    <Box className="py-4 px-8 border-2 border-solid border-gray text-start flex-1">
      <Show above="sm">
        <Text fontWeight={'medium'} fontSize={'sm'}>
          Guest
        </Text>
      </Show>

      <HStack justifyContent={'space-between'}>
        <Show above="sm">
          <Heading my={1} as={'h3'} size={'lg'}>
            Add Guest
          </Heading>
        </Show>
        <Hide above="sm">
          <HStack mt={2} fontWeight={'medium'} fontSize={'sm'}>
            <Plus
              onClick={handleAdd}
              className="hover:cursor-pointer"
              size={10}
            />
            <Text fontWeight={'medium'} fontSize={'sm'}>
              {guestCount}
            </Text>
            <Minus
              onClick={handleMinus}
              className="hover:cursor-pointer"
              size={10}
            />
          </HStack>
        </Hide>
        <UsersThree size={32} weight="fill" />
      </HStack>
      <Show above="sm">
        <HStack mt={2} fontWeight={'medium'} fontSize={'sm'}>
          <Plus
            onClick={handleAdd}
            className="hover:cursor-pointer"
            size={10}
          />
          <Text fontWeight={'medium'} fontSize={'sm'}>
            {guestCount}
          </Text>
          <Minus
            onClick={handleMinus}
            className="hover:cursor-pointer"
            size={10}
          />
        </HStack>
      </Show>
    </Box>
  );
};

export default GuestBox;
