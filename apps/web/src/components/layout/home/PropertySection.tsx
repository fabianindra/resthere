'use client';
import { getDataPropertyByRoom } from '@/api/property';
import CustomCard from '@/components/ui/CustomCard';
import { VStack, HStack, Heading, Box, Text } from '@chakra-ui/react';
import { ArrowRight } from '@phosphor-icons/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function PropertySection() {
  const [dataRoom, setDataRoom] = useState<any>([]);

  const fetchData = async () => {
    try {
      const response = await getDataPropertyByRoom(1);
      setDataRoom(response.data.data);
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box mt={20} className="w-full">
      <VStack alignItems={'start'}>
        <HStack>
          <Heading as={'h3'} size={'lg'}>
            Best property
          </Heading>
        </HStack>
        <HStack w={'full'} justifyContent={'space-between'}>
          <Text color={'gray'} fontSize={'md'}>
            Find Your Ideal Stay Perfectly Suited To You!
          </Text>
          <HStack mr={6}>
            <Link className=" underline text-sm" href={'/list-property'}>
              See more
            </Link>
            <ArrowRight size={20} />
          </HStack>
        </HStack>
      </VStack>
      <HStack my={10} flexWrap={'wrap'} justifyContent={'start'}>
        {dataRoom.length == 0
          ? null
          : dataRoom.map((item: any) => {
              return (
                <CustomCard
                  key={item.id}
                  id={item.id}
                  city={item.city_name}
                  name={item.name}
                  price={item.rooms.length > 0 ? item.rooms[0].price : 0}
                  dashboard={false}
                  startDate={null}
                  endDate={null}
                  fetchData={fetchData}
                  image={item.image}
                />
              );
            })}
      </HStack>
    </Box>
  );
}
