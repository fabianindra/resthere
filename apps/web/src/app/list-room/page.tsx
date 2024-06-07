'use client';
import { getDataRoom } from '@/api/property';
import DateRangePicker from '@/components/layout/home/DateRangePicker';
import GuestBox from '@/components/layout/home/GuestBox';
import LocationBox from '@/components/layout/home/LocationBox';
import SearchButton from '@/components/layout/home/SearchButton';
import CustomCard from '@/components/ui/CustomCard';
import SimplePagination from '@/components/ui/Pagination';
import { Box, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

export default function page() {
  const [guest, setGuest] = useState(1);
  const [dataRoom, setDataRoom] = useState<any>([]);

  const fetchData = async () => {
    try {
      const response = await getDataRoom();
      console.log(response);
      setDataRoom(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <HStack justifyContent={'start'} gap={8} mt={10}>
        {dataRoom.length === 0
          ? null
          : dataRoom.map((item: any) => {
              return item.rooms.length > 0 ? (
                <CustomCard
                  key={item.id}
                  city={item.city_name}
                  name={item.name}
                  price={item.rooms[0].price}
                />
              ) : null;
            })}
      </HStack>
      <SimplePagination page={page} setPage={''} maxPage={10} />
    </Box>
  );
}
