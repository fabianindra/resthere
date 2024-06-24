import React from 'react';
import { Box, Text, HStack } from '@chakra-ui/react';
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
  return (
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
  );
};

export default DateRangePicker;
