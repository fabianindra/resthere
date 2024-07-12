'use client';
import CommentSection from '@/components/layout/CommentSection';
import useGetReviews from '@/hooks/list-property/getReviewProperty';

import {
  HStack,
  VStack,
  InputGroup,
  Input,
  InputRightElement,
  Select,
  Button,
  Box,
  Link as ChakraLink,
  Heading,
  useBreakpointValue,
  Stack,
  Hide,
  Show,
} from '@chakra-ui/react';
import {
  MagnifyingGlass,
  SortAscending,
  SortDescending,
} from '@phosphor-icons/react';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import CustomCardRoom from '@/components/layout/property-detail/CustomCardRoom';
import SimplePagination from '@/components/ui/Pagination';
import usePropertyDetails from '@/hooks/property/usePropertyDetail';
import useRoomsData from '@/hooks/room/useRoomsData';
import dynamic from 'next/dynamic';

export default function Page() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [propertyId, setPropertyId] = useState<number>(0);

  const params = useParams();
  const searchParams = useSearchParams();
  const { id }: any = params;
  const startDateParam = searchParams.get('startDate');
  const endDateParam = searchParams.get('endDate');

  const {
    property,
    loading: propertyLoading,
    error: propertyError,
  } = usePropertyDetails(id);
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
    fetchReviews(parseInt(id));
  }, []);

  useEffect(() => {
    if (id) {
      const propertyIdString = Array.isArray(id) ? id[0] : id;
      const propertyIdNumber = parseInt(propertyIdString, 10);
      if (!isNaN(propertyIdNumber)) {
        setPropertyId(propertyIdNumber);
      }
    }

    if (startDateParam) {
      setStartDate(new Date(startDateParam));
    }
    if (endDateParam) {
      setEndDate(new Date(endDateParam));
    }
  }, [id, startDateParam, endDateParam]);

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

  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/layout/property-detail/Map'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );

  const inputWidth = useBreakpointValue({ base: '100%', md: '300px' });
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box className="px-4 md:px-16">
      <ChakraLink href="/list-property">
        <HStack my={10}>
          <ArrowLeft size={32} />
          <Heading ml={8} size="lg">
            {property ? property.name : 'Property Details'}
          </Heading>
        </HStack>
      </ChakraLink>
      <Stack
        my={20}
        justifyContent="space-between"
        direction={isMobile ? 'column' : 'row'}
        w="100%"
      >
        <InputGroup w={inputWidth}>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter amount"
            value={search}
          />
          <InputRightElement>
            <MagnifyingGlass size={20} />
          </InputRightElement>
        </InputGroup>
        <Stack
          spacing={4}
          justifyContent={'space-between'}
          direction={isMobile ? 'column' : 'row'}
          w="100%"
        >
          <Stack alignItems={'center'} direction={isMobile ? 'column' : 'row'}>
            <Input
              onChange={(e: any) => setStartDate(new Date(e.target.value))}
              value={startDate ? startDate.toISOString().split('T')[0] : ''}
              placeholder="Select Date and Time"
              size="md"
              type="date"
            />
            <Hide below="sm">
              <Box w={10} className="border-b border-[#000000]" />
            </Hide>
            <Input
              onChange={(e: any) => setEndDate(new Date(e.target.value))}
              value={endDate ? endDate.toISOString().split('T')[0] : ''}
              placeholder="Select Date and Time"
              size="md"
              type="date"
            />
          </Stack>
          <HStack>
            <Select
              onChange={(e) => setSortBy(e.target.value)}
              placeholder="Sort By"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
            </Select>
            <Button onClick={handleDirections} colorScheme="gray">
              <Hide below="sm">
                {sortDirection === 'asc' ? (
                  <SortAscending size={40} />
                ) : (
                  <SortDescending size={40} />
                )}
              </Hide>
              <Show below="sm">
                {sortDirection === 'asc' ? (
                  <SortAscending size={30} />
                ) : (
                  <SortDescending size={30} />
                )}
              </Show>
            </Button>
          </HStack>
        </Stack>
      </Stack>
      <Stack
        justifyContent="start"
        gap={8}
        my={8}
        w="100%"
        flexWrap="wrap"
        direction={isMobile ? 'column' : 'row'}
      >
        {fetchedRooms.map((item: any) => (
          <CustomCardRoom
            key={item.id}
            id={item.id}
            capacity={item.capacity_person}
            name={item.name}
            price={item.finalPrice}
            dashboard={false}
            startDate={startDate}
            endDate={endDate}
            fetchRooms={fetchRooms}
            image={item.image}
          />
        ))}
      </Stack>
      <SimplePagination page={page} setPage={setPage} maxPage={1} />
      <div className="bg-white-700 mx-auto my-5 w-full h-[480px]">
        <Map
          propertyName={property ? property.name : ''}
          posix={[
            property ? parseInt(property.latitude) : 4.79029,
            property ? parseInt(property.latitude) : -75.69003,
          ]}
        />
      </div>
      <CommentSection reviews={reviews} />
    </Box>
  );
}
