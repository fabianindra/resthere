'use client';
import ClouserDestination from '@/components/layout/home/ClouserDestination';
import DateRangePicker from '@/components/layout/home/DateRangePicker';
import GuestBox from '@/components/layout/home/GuestBox';
import Hero from '@/components/layout/home/Hero';
import LocationBox from '@/components/layout/home/LocationBox';
import PromoSection from '@/components/layout/home/PromoSection';
import PropertySection from '@/components/layout/home/PropertySection';
import SearchButton from '@/components/layout/home/SearchButton';
import UpdateEmail from '@/components/layout/home/UpdateEmail';
import CustomCard from '@/components/ui/CustomCard';
import { Box, HStack, Heading, VStack, Text, Button } from '@chakra-ui/react';
import { SealPercent, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [guest, setGuest] = useState(1);
  return (
    <Box>
      <Box className="mx-10">
        <Hero />
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
        <ClouserDestination />
        <PromoSection />
        <PropertySection />
      </Box>
      <UpdateEmail />
    </Box>
  );
}
