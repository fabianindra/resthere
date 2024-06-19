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
import { Box, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const [guest, setGuest] = useState(1);
  const [city, setCity] = useState();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/list-property?city=${city ? `${city}` : ''}`);
  };

  return (
    <Box>
      <Box className="mx-10">
        <Hero />
        <HStack flexWrap={'wrap'} mt={10}>
          <LocationBox
            setLocation={setCity}
            location={city ? city : 'Choose Location'}
          />
          <GuestBox set={setGuest} guestCount={guest} />
          <HStack
            gap={20}
            flexWrap={'wrap'}
            className="py-4 px-8 border-2 border-solid border-gray text-start flex-2"
          >
            <DateRangePicker label="from" />
            <DateRangePicker label="until" />
          </HStack>
          <SearchButton onClick={handleClick} />
        </HStack>
        <ClouserDestination />
        <PromoSection />
        <PropertySection />
      </Box>
      <UpdateEmail />
    </Box>
  );
}
