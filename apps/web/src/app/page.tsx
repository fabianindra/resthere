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
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const router = useRouter();

  const handleClick = () => {
    router.push(
      `/list-property?city=${city ? `${city}` : ''}&startDate=${startDate ? `${startDate}` : ''}&endDate=${endDate ? `${endDate}` : ''}`,
    );
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
            gap={{ base: 2, sm: 20 }}
            flexWrap={'wrap'}
            py={{ sm: '0.8rem', base: '4px' }}
            px={{ sm: '2rem', base: '4px' }}
            className="border-2 border-solid border-gray text-start flex-2"
            justifyContent={'space-around'}
            w={{ base: '100%', sm: 'auto' }}
          >
            <DateRangePicker
              setValue={setStartDate}
              label="from"
              value={null}
            />
            <DateRangePicker setValue={setEndDate} label="until" value={null} />
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
