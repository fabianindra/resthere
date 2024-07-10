import { Box, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import HeroItem from './HeroItem';
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';

export default function Hero() {
  const heroItem = [
    {
      headline: 'Find Your Ideal Stay',
      subheadline: 'Perfectly Suited To You!',
      title: "'An all-in-one platform that helps you to find what you needed'",
      image: '/hero4.png',
    },
    {
      headline: 'Discover the Best Deals!',
      subheadline: 'Exclusive discounts on top-rated accommodations.',
      title:
        ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, nulla incidunt, aperiam cupiditate beatae nisi fugit modi nobis placeat exercitationem iusto laboriosam, velit odit est! Quaerat deserunt est magnam numquam.',
      image: '/hero2.png',
    },
    {
      headline: 'Trusted by Thousands of Happy Customers',
      subheadline: 'Read reviews from our satisfied clients.',
      title:
        'Join a community of travelers who found their perfect stays with us.',
      image: '/hero3.png',
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex == 0 ? Math.ceil(heroItem.length) - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex == Math.ceil(heroItem.length) - 1 ? 0 : prevIndex + 1,
    );
  };
  return (
    <HStack
      h={{ base: '90vh', sm: 'auto' }}
      position="relative"
      className="w-full overflow-hidden"
    >
      <Box className="p-2 absolute bg-travertine rounded-full cursor-pointer left-1 top-1/2 transform -translate-y-1/2 z-10">
        <CaretLeft size={24} onClick={handlePrev} />
      </Box>

      <Box
        className="w-full flex my-8 transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {heroItem.map((hero, index) => (
          <HeroItem
            key={index}
            headline={hero.headline}
            subheadline={hero.subheadline}
            title={hero.title}
            image={hero.image}
          />
        ))}
      </Box>
      <Box className="p-2 absolute bg-travertine rounded-full cursor-pointer right-1 top-1/2 transform -translate-y-1/2 z-10">
        <CaretRight className="" size={24} onClick={handleNext} />
      </Box>
    </HStack>
  );
}
