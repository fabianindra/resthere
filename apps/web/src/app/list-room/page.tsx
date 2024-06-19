'use client';
import { getDataPropertyByRoom } from '@/api/property';
import DateRangePicker from '@/components/layout/home/DateRangePicker';
import GuestBox from '@/components/layout/home/GuestBox';
import LocationBox from '@/components/layout/home/LocationBox';
import SearchButton from '@/components/layout/home/SearchButton';
import CustomCard from '@/components/ui/CustomCard';
import SimplePagination from '@/components/ui/Pagination';
import { Box, HStack } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const searchParams = useSearchParams();
  const [guest, setGuest] = useState(1);
  const [dataRoom, setDataRoom] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [city, setCity] = useState<any>();

  const fetchData = async () => {
    try {
      const response = await getDataPropertyByRoom(page, city);
      setMaxPage(Math.ceil(response.data.count / 4));
      setDataRoom(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const cityParam = searchParams.get('city');
    if (cityParam && cityParam != undefined) {
      setCity(cityParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (city !== null) {
      fetchData();
    }
  }, [city, page]);

  return (
    <Box className="mx-10">
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
        <SearchButton />
      </HStack>
      <HStack justifyContent={'start'} gap={8} mt={10}>
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
                />
              );
            })}
      </HStack>
      <SimplePagination page={page} setPage={setPage} maxPage={maxPage} />
    </Box>
  );
}
