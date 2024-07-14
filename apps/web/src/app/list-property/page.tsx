'use client';
import DateRangePicker from '@/components/layout/home/DateRangePicker';
import GuestBox from '@/components/layout/home/GuestBox';
import LocationBox from '@/components/layout/home/LocationBox';
import SearchButton from '@/components/layout/home/SearchButton';
import CustomCard from '@/components/ui/CustomCard';
import SimplePagination from '@/components/ui/Pagination';
import { Box, HStack, Hide } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import usePropertyAll from '@/hooks/property/usePropertyAll';

export default function Page() {
  const searchParams = useSearchParams();
  const [guest, setGuest] = useState(1);
  const cityParam: any = searchParams.get('city');
  const startDateParam = searchParams.get('startDate');
  const endDateParam = searchParams.get('endDate');

  const {
    dataProperty,
    page,
    setPage,
    maxPage,
    city,
    setCity,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = usePropertyAll();

  useEffect(() => {
    if (cityParam) {
      setCity(cityParam);
    }
    if (startDateParam) {
      setStartDate(startDateParam);
    }
    if (endDateParam) {
      setEndDate(endDateParam);
    }
  }, [searchParams, setCity, setStartDate, setEndDate]);

  useEffect(() => {
    if (!cityParam || !startDateParam || !endDateParam) {
      setCity('');
      setStartDate('');
      setEndDate('');
    }
  }, []);

  return (
    <Box className="mx-10">
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
            value={startDateParam}
          />
          <Hide above="sm">-</Hide>
          <DateRangePicker
            setValue={setEndDate}
            label="until"
            value={endDateParam}
          />
        </HStack>
        <SearchButton />
      </HStack>
      <HStack flexWrap={'wrap'} justifyContent={'start'} gap={8} mt={10}>
        {dataProperty.length === 0
          ? null
          : dataProperty.map((item: any) => (
              <CustomCard
                key={item.id}
                id={item.id}
                city={item.city_name}
                name={item.name}
                price={item.rooms.length > 0 ? item.rooms[0].price : 0}
                dashboard={false}
                startDate={new Date(startDate)}
                endDate={new Date(endDate)}
                fetchData={() => {}}
                image={item.image}
              />
            ))}
      </HStack>
      <SimplePagination page={page} setPage={setPage} maxPage={maxPage} />
    </Box>
  );
}
