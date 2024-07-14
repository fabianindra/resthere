'use client';
import React, { useEffect, useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarDots } from '@phosphor-icons/react/dist/ssr';
import { Box, Heading, Hide, Show, Text } from '@chakra-ui/react';

const CustomDatePicker = ({
  setValue,
  value,
}: {
  setValue: (date: Date) => void;
  value: string | null;
}) => {
  const [startDate, setStartDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  const initialMount = useRef(true);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (date: Date) => {
    setStartDate(date);
    setValue(date);
    setIsOpen(false);
  };

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }
    if (value) {
      // Ensure the value is in YYYY-MM-DD format
      const formattedValue = value.includes('-')
        ? value
        : value.split('/').reverse().join('-');
      const newDate = new Date(formattedValue);

      if (!isNaN(newDate.getTime()) && (!startDate || newDate.getTime() !== startDate.getTime())) {
        setStartDate(newDate);
        setValue(newDate);
      }
    }
  }, [value]);

  return (
    <Box className="relative">
      <button
        onClick={handleButtonClick}
        className="flex items-center text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Show above="sm">
          <Heading my={1} mr={4} as={'h3'}>
            {startDate ? startDate.toLocaleDateString() : 'Select a date'}
          </Heading>
          <CalendarDots size={32} className="inline-block mt-1" />
        </Show>
        <Hide above="sm">
          <Text my={1} mr={4} as={'h3'}>
            {startDate ? startDate.toLocaleDateString() : 'Select'}
          </Text>
          <CalendarDots size={12} className="inline-block mt-1" />
        </Hide>
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
