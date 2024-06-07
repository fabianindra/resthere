'use client';
import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Text,
  HStack,
  Heading,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';
import { MapPinArea } from '@phosphor-icons/react';
import { getDataCity, getDataProvinces } from '@/api/content';
import { City, LocationBoxProps, Province } from '@/types';

const LocationBox: React.FC<LocationBoxProps> = ({ location, setLocation }) => {
  const [datas, setDatas] = useState<Province[]>([]);
  const [cities, setCities] = useState<Record<number, City[]>>({});
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const response = await getDataProvinces();
      setDatas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCity = async (id_provinces: number) => {
    try {
      const response = await getDataCity(id_provinces);
      setCities((prevState) => ({
        ...prevState,
        [id_provinces]: response.data,
      }));
      setSelectedProvince(id_provinces);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const memoizedCities = useMemo(() => cities, [cities]);

  return (
    <Menu>
      <MenuButton>
        <Box
          minW={'fit-content'}
          className="flex-1 py-4 px-8 border-2 border-solid border-gray text-start"
        >
          <Text fontWeight={'medium'} fontSize={'sm'}>
            Location
          </Text>
          <HStack>
            <Heading my={1} mr={4} as={'h3'} size={'lg'}>
              Select Location
            </Heading>
            <MapPinArea size={32} weight="fill" />
          </HStack>
          <Text mt={2} fontWeight={'medium'} fontSize={'sm'}>
            {location}
          </Text>
        </Box>
      </MenuButton>
      <MenuList height={500} overflow={'auto'}>
        <Accordion>
          {datas?.map((item) => (
            <AccordionItem key={item.id}>
              <h2>
                <AccordionButton onClick={() => getCity(item.id)}>
                  <Box as="span" flex="1" textAlign="left">
                    {item.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {selectedProvince === item.id && memoizedCities[item.id] ? (
                  <Box>
                    {memoizedCities[item.id].map((city) => (
                      <Text
                        key={city.id}
                        className=" cursor-pointer"
                        onClick={() => setLocation(city.name)}
                      >
                        {city.name}
                      </Text>
                    ))}
                  </Box>
                ) : (
                  <Text>Loading...</Text>
                )}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </MenuList>
    </Menu>
  );
};

export default LocationBox;
