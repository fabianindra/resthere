'use client';
import DateRangePicker from '@/components/layout/home/DateRangePicker';
import GuestBox from '@/components/layout/home/GuestBox';
import LocationBox from '@/components/layout/home/LocationBox';
import SearchButton from '@/components/layout/home/SearchButton';
import CustomCard from '@/components/ui/CustomCard';
import SimplePagination from '@/components/ui/Pagination';
import { Box, HStack } from '@chakra-ui/react';
import { MapPin, Star } from '@phosphor-icons/react/dist/ssr';
import React, { useState } from 'react';

export default function page() {
  const [guest, setGuest] = useState(1);
  return (
    <Box className="mx-10">
      <HStack flexWrap={'wrap'} mt={10}>
        <LocationBox location="Semarang, Jawa Tengah, Indonesia" />
        <GuestBox set={setGuest} guestCount={guest} />
        <HStack
          gap={20}
          flexWrap={'wrap'}
          className="py-4 px-8 border-2 border-solid border-gray text-start flex-2"
        >
          <DateRangePicker label="from" />
          <DateRangePicker label="until" />
        </HStack>
        <SearchButton />
      </HStack>
      <HStack justifyContent={'center'} gap={8} mt={10}>
        <CustomCard />
        <CustomCard />
        <CustomCard />
        <CustomCard />
      </HStack>
      <SimplePagination page={page} setPage={''} maxPage={10} />
    </Box>
  );
}
