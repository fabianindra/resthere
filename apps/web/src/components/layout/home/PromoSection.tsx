import { VStack, Heading, HStack, Text, Box } from '@chakra-ui/react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { SealPercent } from '@phosphor-icons/react/dist/ssr';
import React, { useState } from 'react';
import CityBoxItem from './CityBoxItem';

export default function PromoSection() {
  const promos = [
    { url: '/1.png' },
    { url: '/2.png' },
    { url: '/3.png' },
    { url: '/4.png' },
    { url: '/5.png' },
    { url: '/6.png' },
    { url: '/7.png' },
    { url: '/8.png' },
    { url: '/9.png' },
    { url: '/10.png' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex == 0 ? Math.ceil(promos.length) - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex == Math.ceil(promos.length) - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <Box className="relative w-full mx-auto overflow-hidden">
      <VStack mt={20} alignItems={'start'}>
        <HStack>
          <SealPercent size={40} />
          <Heading as={'h3'} size={'lg'}>
            Best deals
          </Heading>
        </HStack>
        <HStack w={'full'} justifyContent={'space-between'}>
          <Text color={'gray'} fontSize={'md'}>
            Best deals for a price-less
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
        {promos.map((promo, index) => (
          <Box
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 p-2 box-border"
          >
            <CityBoxItem url={promo.url} title={''} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
