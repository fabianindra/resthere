'use client';
import CommentSection from '@/components/layout/CommentSection';
import useGetReviews from '@/hooks/list-property/getReviewProperty';

import {
  HStack,
  InputGroup,
  Input,
  InputRightElement,
  Select,
  Button,
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

  const params = useParams();
  const searchParams = useSearchParams();
  const { id } = params;
  const startDateParam = searchParams.get('startDate');
  const endDateParam = searchParams.get('endDate');

  const {
    property,
    loading: propertyLoading,
    error: propertyError,
    fetchProperty,
  } = usePropertyDetails();
  const { fetchReviews, reviews, loading, error } = useGetReviews();
  const {
    rooms: fetchedRooms,
    loading: roomsLoading,
    error: roomsError,
    fetchRooms,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  } = useRoomsData(propertyId, page, search, category, sortBy, sortDirection);

  const handleDirections = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    if (id) {
      const propertyIdString = Array.isArray(id) ? id[0] : id;
      const propertyIdNumber = parseInt(propertyIdString, 10);
      if (!isNaN(propertyIdNumber)) {
        fetchProperty(propertyIdNumber);
        setPropertyId(propertyIdNumber);
      }
    }

    if (startDateParam) {
      setStartDate(new Date(startDateParam));
    }
    if (endDateParam) {
      setEndDate(new Date(endDateParam));
    }
  }, [id, startDateParam, endDateParam, fetchProperty]);

  useEffect(() => {
    if (propertyId) {
      fetchRooms();
    }
  }, [
    propertyId,
    page,
    search,
    category,
    sortBy,
    sortDirection,
    startDate,
    endDate,
    fetchRooms,
  ]);

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
          <HStack>
            <Input
              onChange={(e: any) => setStartDate(new Date(e.target.value))}
              value={startDate ? startDate.toISOString().split('T')[0] : ''}
              placeholder="Select Date and Time"
              size="md"
              type="date"
            />
            <Box w={10} className="border-b border-[#000000]" />
            <Input
              onChange={(e: any) => setEndDate(new Date(e.target.value))}
              value={endDate ? endDate.toISOString().split('T')[0] : ''}
              placeholder="Select Date and Time"
              size="md"
              type="date"
            />
          </HStack>
          <Select
            onChange={(e) => setSortBy(e.target.value)}
            placeholder="Sort By"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </Select>
          <Button onClick={handleDirections} colorScheme="gray">
            {sortDirection === 'asc' ? (
              <SortAscending size={100} />
            ) : (
              <SortDescending size={100} />
            )}
          </Button>
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
            endDate={endDate} // Ensure endDate is passed correctly as Date | null
            fetchRooms={fetchRooms}
          />
        ))}
      </HStack>
      <SimplePagination page={page} setPage={setPage} maxPage={1} />
      <CommentSection reviews={reviews} />
    </Box>
  );
}
