'use client'

import {
  HStack,
  InputGroup,
  Input,
  InputRightElement,
  Select,
  Button,
  Center,
  Divider,
  Box,
  Link as ChakraLink,
  Heading,
} from '@chakra-ui/react';
import {
  MagnifyingGlass,
  SortAscending,
  SortDescending,
} from '@phosphor-icons/react';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CustomCardRoom from '@/components/layout/property-detail/CustomCardRoom';
import SimplePagination from '@/components/ui/Pagination';
import usePropertyDetails from '@/hooks/property/usePropertyDetail';
import useRoomsData from '@/hooks/room/useRoomsData';

export default function Page() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [propertyId, setPropertyId] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const params = useParams();
  const searchParams = useSearchParams();
  const { id } = params;
  const [rooms, setRooms] = useState<any[]>([]);
  const startDateParam = searchParams.get('startDate');
  const endDateParam = searchParams.get('endDate');

  const {
    property,
    loading: propertyLoading,
    error: propertyError,
    fetchProperty,
  } = usePropertyDetails();
  const {
    rooms: fetchedRooms,
    loading: roomsLoading,
    error: roomsError,
    fetchRooms,
  } = useRoomsData(propertyId, page, search, category, sortBy, sortDirection, startDate, endDate);

  const handleDirections = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    if (propertyId) {
      fetchRooms();
    }
  }, [propertyId, page, search, category, sortBy, sortDirection, startDate, endDate]);

  useEffect(() => {
    if (id) {
      const propertyIdString = Array.isArray(id) ? id[0] : id;
      const propertyIdNumber = parseInt(propertyIdString, 10);
      if (!isNaN(propertyIdNumber)) {
        fetchProperty(propertyIdNumber);
        setPropertyId(propertyIdNumber);
      }

      // Convert startDateParam and endDateParam to Date objects
      if (startDateParam) {
        setStartDate(new Date(startDateParam));
      }
      if (endDateParam) {
        setEndDate(new Date(endDateParam));
      }
    }
  }, [id, startDateParam, endDateParam]);

  return (
    <Box className="px-16">
      <ChakraLink href="/list-property">
        <HStack my={10}>
          <ArrowLeft size={32} />
          <Heading ml={8} size="lg">
            {property ? property.name : 'Property Details'}
          </Heading>
        </HStack>
      </ChakraLink>
      <HStack my={20} justifyContent="space-between">
        <InputGroup w={300}>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter amount"
            value={search}
          />
          <InputRightElement>
            <MagnifyingGlass size={20} />
          </InputRightElement>
        </InputGroup>
        <HStack>
          <Select
            onChange={(e) => setSortBy(e.target.value)}
            placeholder="Sort By"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </Select>
          <Button onClick={handleDirections} colorScheme="gray">
            {sortDirection === 'asc' ? (
              <SortAscending size={30} />
            ) : (
              <SortDescending size={30} />
            )}
          </Button>
          <Center height="35px" mx={4}>
            <Divider border="1px" borderColor="black" orientation="vertical" />
          </Center>
        </HStack>
      </HStack>
      <HStack justifyContent="start" gap={8} my={8}>
        {fetchedRooms.map((item: any) => (
          <CustomCardRoom
            key={item.id}
            id={item.id}
            capacity={item.capacity_person}
            name={item.name}
            price={item.price}
            dashboard={false}
            startDate={startDate} // Ensure startDate is passed correctly as Date | null
            endDate={endDate}     // Ensure endDate is passed correctly as Date | null
          />
        ))}
      </HStack>
      <SimplePagination page={page} setPage={setPage} maxPage={1} />
    </Box>
  );
}
