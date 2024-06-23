'use client';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarDots } from '@phosphor-icons/react/dist/ssr';
import { Box, Heading } from '@chakra-ui/react';

const CustomDatePicker = ({ setValue }: { setValue: (date: Date) => void }) => {
  const [startDate, setStartDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (date: Date) => {
    setStartDate(date);
    setValue(date);
    setIsOpen(false);
  };

  return (
    <Box className="relative">
      <button
        onClick={handleButtonClick}
        className="flex items-center text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Heading my={1} mr={4} as={'h3'} size={'lg'}>
          {startDate ? startDate.toLocaleDateString() : 'Select a date'}
        </Heading>
        <CalendarDots size={32} className="inline-block mt-1" />
      </button>
      {isOpen && (
        <Box className="absolute mt-2 z-50">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            inline
            className="p-2 bg-white border border-gray-300 rounded-md shadow-lg"
          />
        </Box>
      )}
    </Box>
  );
};

export default CustomDatePicker;
