import { HStack } from '@chakra-ui/react';
import { Star } from '@phosphor-icons/react';
import React from 'react';

export default function FormRating(props: any) {
  const { rating, handleMouseOver, handleClick } = props;
  return (
    <HStack my={4} w={'100%'}>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          weight="fill"
          className={`h-8 w-8 transition-colors ${
            index < rating
              ? 'text-[#facc15] hover:text-[#facc15]'
              : 'text-[#9ca3af] hover:text-[#facc15]'
          }`}
          onMouseOver={() => handleMouseOver(index)}
          onClick={() => handleClick(index)}
        />
      ))}
    </HStack>
  );
}
