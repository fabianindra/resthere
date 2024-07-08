import React, { useState } from 'react';
import { Box, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';
import CityBoxItem from './CityBoxItem';
import { useRouter } from 'next/navigation';

export default function ClouserDestination() {
  const cities = [
    {
      url: '/BALI.png',
      title: 'Denpasar, Bali',
      link: '/list-property?city=KOTA%20DENPASAR',
    },
    {
      url: '/BANDUNG.png',
      title: 'Bandung',
      link: '/list-property?city=KABUPATEN%20BANDUNG',
    },
    {
      url: '/JAKARTA.png',
      title: 'Jakarta',
      link: '/list-property?city=KOTA%20JAKARTA%20PUSAT',
    },
    {
      url: '/LOMBOK.png',
      title: 'Lombok',
      link: '/list-property?city=KABUPATEN%20LOMBOK%20UTARA',
    },
    {
      url: '/MAKASAR.png',
      title: 'Makasar',
      link: '/list-property?city=KOTA%20MAKASSAR',
    },
    {
      url: '/MALANG.png',
      title: 'Malang',
      link: '/list-property?city=KOTA%20MALANG',
    },
    {
      url: '/MEDAN.png',
      title: 'Medan',
      link: '/list-property?city=KOTA%20MEDAN',
    },
    {
      url: '/SEMARANG.png',
      title: 'Semarang',
      link: '/list-property?city=KOTA%20SEMARANG',
    },
    {
      url: '/SURABAYA.png',
      title: 'Surabaya',
      link: '/list-property?city=KOTA%20SURABAYA',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

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
            onClick={() => router.push(city.link)}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 p-2 box-border cursor-pointer"
          >
            <CityBoxItem url={city.url} title={city.title} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
