'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarDots } from '@phosphor-icons/react/dist/ssr';
import { Heading } from '@chakra-ui/react';

const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (date: any) => {
    setStartDate(date);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleButtonClick}
        className="flex items-center text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Heading my={1} mr={4} as={'h3'} size={'lg'}>
          {startDate
            ? startDate.toLocaleDateString()
            : new Date().toLocaleDateString()}
        </Heading>
        <CalendarDots size={32} className="inline-block mt-1" />
      </button>
      {isOpen && (
        <div className="absolute mt-2 z-50">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            inline
            className="p-2 bg-white border border-gray-300 rounded-md shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
