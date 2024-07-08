'use client';
import { getDataPropertyByRoom } from '@/api/property';
import DateRangePicker from '@/components/layout/home/DateRangePicker';
import GuestBox from '@/components/layout/home/GuestBox';
import LocationBox from '@/components/layout/home/LocationBox';
import SearchButton from '@/components/layout/home/SearchButton';
import CustomCard from '@/components/ui/CustomCard';
import SimplePagination from '@/components/ui/Pagination';
import { Box, HStack, Hide } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const searchParams = useSearchParams();
  const [guest, setGuest] = useState(1);
  const [dataRoom, setDataRoom] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [city, setCity] = useState<any>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const cityParam = searchParams.get('city');
  const startDateParam = searchParams.get('startDate');
  const endDateParam = searchParams.get('endDate');

  const fetchData = async () => {
    try {
      const response = await getDataPropertyByRoom(
        page,
        city,
        undefined,
        undefined,
        undefined,
        startDate ? startDate.toISOString().split('T')[0] : undefined,
        endDate ? endDate.toISOString().split('T')[0] : undefined,
      );
      setMaxPage(Math.ceil(response.data.count / 4));
      setDataRoom(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cityParam) {
      setCity(cityParam);
      console.log(cityParam);
    }
    if (startDateParam) {
      setStartDate(new Date(startDateParam));
    }
    if (endDateParam) {
      setEndDate(new Date(endDateParam));
    }
  }, [searchParams]);

  useEffect(() => {
    fetchData();
  }, [city, page, startDate, endDate, searchParams]);

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
        {dataRoom.length === 0
          ? null
          : dataRoom.map((item: any) => {
              return (
                <CustomCard
                  key={item.id}
                  id={item.id}
                  city={item.city_name}
                  name={item.name}
                  price={item.rooms[0].price}
                  dashboard={false}
                  startDate={startDate}
                  endDate={endDate}
                  fetchData={fetchData}
                  image={item.image}
                />
              );
            })}
      </HStack>
      <SimplePagination page={page} setPage={setPage} maxPage={maxPage} />
    </Box>
  );
}
