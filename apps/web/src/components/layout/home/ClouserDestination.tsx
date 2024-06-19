import React, { useState } from 'react';
import { Box, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';
import CityBoxItem from './CityBoxItem';

export default function ClouserDestination() {
  const cities = [
    { url: '/BALI.png', title: 'Denpasar, Bali' },
    { url: '/BANDUNG.png', title: 'Bandung' },
    { url: '/JAKARTA.png', title: 'Jakarta' },
    { url: '/LOMBOK.png', title: 'Lombok' },
    { url: '/MAKASAR.png', title: 'Makasar' },
    { url: '/MALANG.png', title: 'Malang' },
    { url: '/MEDAN.png', title: 'Medan' },
    { url: '/SEMARANG.png', title: 'Semarang' },
    { url: '/SURABAYA.png', title: 'Surabaya' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex == 0 ? Math.ceil(cities.length) - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex == Math.ceil(cities.length) - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <Box className="relative w-full mx-auto overflow-hidden">
      <VStack mt={20} alignItems={'start'}>
        <Heading as={'h3'} size={'lg'}>
          Browse by Destination
        </Heading>
        <HStack w={'full'} justifyContent={'space-between'}>
          <Text color={'gray'} fontSize={'md'}>
            Explore perfect place by destination
          </Text>
          <HStack>
            <CaretLeft
              className="cursor-pointer"
              size={24}
              onClick={handlePrev}
            />
            <CaretRight
              className="cursor-pointer"
              size={24}
              onClick={handleNext}
            />
          </HStack>
        </HStack>
      </VStack>
      <Box
        className="flex my-8 transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${currentIndex * 300}px)` }}
      >
        {cities.map((city, index) => (
          <Box
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 p-2 box-border"
          >
            <CityBoxItem url={city.url} title={city.title} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
