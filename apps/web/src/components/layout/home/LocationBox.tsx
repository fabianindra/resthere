'use client';
import React, { useState, useMemo } from 'react';
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
  Show,
  Hide,
} from '@chakra-ui/react';
import { MapPinArea } from '@phosphor-icons/react';
import useProvinces from '@/hooks/property/useProvinces';
import useCities from '@/hooks/property/useCities';
import { LocationBoxProps } from '@/types';

const LocationBox: React.FC<LocationBoxProps> = ({ location, setLocation }) => {
  const {
    provinces,
    loading: provincesLoading,
    error: provincesError,
  } = useProvinces();
  const {
    cities,
    fetchCities,
    loading: citiesLoading,
    error: citiesError,
  } = useCities();
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);

  const handleProvinceClick = (id: number) => {
    fetchCities(id);
    setSelectedProvince(id);
  };

  const memoizedCities = useMemo(() => cities, [cities]);

  return (
    <Menu>
      <MenuButton w={{ base: '100%', md: 'auto' }}>
        <Box
          minW={'fit-content'}
          className=" flex-1 py-4 px-8 border-2 border-solid border-gray text-start"
        >
          <Show above="sm">
            <Text fontWeight={'medium'} fontSize={'sm'}>
              Location
            </Text>
          </Show>

          <HStack justifyContent={{ base: 'space-between', sm: 'start' }}>
            <Heading
              my={1}
              as={'h3'}
              size={{
                base: 'md',
                sm: 'lg',
              }}
            >
              Select Location
            </Heading>
            <Show above="sm">
              <MapPinArea size={32} weight="fill" />
            </Show>
            <Hide above="sm">
              <MapPinArea size={26} weight="fill" />
            </Hide>
          </HStack>
          <Show above="sm">
            <Text mt={2} fontWeight={'medium'} fontSize={'sm'}>
              {location}
            </Text>
          </Show>
        </Box>
      </MenuButton>
      <MenuList height={500} overflow={'auto'}>
        <Accordion>
          {provincesLoading ? (
            <Text>Loading provinces...</Text>
          ) : provincesError ? (
            <Text>{provincesError}</Text>
          ) : (
            provinces.map((item) => (
              <AccordionItem key={item.id}>
                <h2>
                  <AccordionButton onClick={() => handleProvinceClick(item.id)}>
                    <Box as="span" flex="1" textAlign="left">
                      {item.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {selectedProvince == item.id ? (
                    citiesLoading ? (
                      <Text>Loading cities...</Text>
                    ) : citiesError ? (
                      <Text>{citiesError}</Text>
                    ) : (
                      memoizedCities[item.id]?.map((city) => (
                        <Text
                          key={city.id}
                          className=" cursor-pointer"
                          onClick={() => setLocation(city.name)}
                        >
                          {city.name}
                        </Text>
                      ))
                    )
                  ) : (
                    <Text>Loading...</Text>
                  )}
                </AccordionPanel>
              </AccordionItem>
            ))
          )}
        </Accordion>
      </MenuList>
    </Menu>
  );
};

export default LocationBox;
