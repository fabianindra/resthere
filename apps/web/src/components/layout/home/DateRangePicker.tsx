import React, { useEffect } from 'react';
import { Box, Text, HStack, Show, Hide, Input } from '@chakra-ui/react';
import CustomDatePicker from './CustomDatePicker';

const DateRangePicker = ({
  label,
  setValue,
  value,
}: {
  label: string;
  setValue: (date: Date) => void;
  value: string | null;
}) => {
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <>
      <Show above="sm">
        <Box minW={'fit-content'} maxW={'full'}>
          <Text fontWeight={'medium'} fontSize={'sm'}>
            {label}
          </Text>
          <CustomDatePicker value={value} setValue={setValue} />
          <HStack mt={2} justifyContent={'space-between'}>
            <Text
              className="hover:cursor-pointer"
              fontWeight={'medium'}
              fontSize={'sm'}
            >
              Prev
            </Text>
            <Text
              className="hover:cursor-pointer"
              fontWeight={'medium'}
              fontSize={'sm'}
            >
              Next
            </Text>
          </HStack>
        </Box>
      </Show>
      <Hide above="sm">
        <CustomDatePicker value={value} setValue={setValue} />
      </Hide>
    </>
  );
};

export default DateRangePicker;
