'use client';
import SimplePagination from '@/components/ui/Pagination';
import usePropertyDetails from '@/hooks/property/usePropertyDetail';
import useRoomsData from '@/hooks/room/useRoomsData';
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
  useDisclosure,
  Heading,
  Image,
  Stack,
  useBreakpointValue,
  Hide,
  Show,
} from '@chakra-ui/react';
import {
  MagnifyingGlass,
  SortAscending,
  SortDescending,
  Plus,
} from '@phosphor-icons/react';
import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import ModalAddRoom from '@/components/layout/property-detail/ModalAddRoom';
import CustomCardRoom from '@/components/layout/property-detail/CustomCardRoom';
import dynamic from 'next/dynamic';
import useGetReviews from '@/hooks/list-property/getReviewProperty';
import CommentSection from '@/components/layout/CommentSection';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

export default function Page() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [propertyId, setPropertyId] = useState<number>(0);
  const params: { id: string } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    property,
    loading: propertyLoading,
    error: propertyError,
  } = usePropertyDetails(params.id);
  const {
    rooms,
    loading: roomsLoading,
    error: roomsError,
    fetchRooms,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  } = useRoomsData(propertyId, page, search, category, sortBy, sortDirection);
  const { fetchReviews, reviews, loading, error } = useGetReviews();

  const handleDirections = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    setPropertyId(parseInt(params.id));
    fetchReviews(parseInt(params.id));
  }, []);

  useEffect(() => {
    if (propertyId) {
      fetchRooms();
    }
  }, [propertyId, page, search, category, sortBy, sortDirection]);

  useEffect(() => {
    console.log(rooms);
  }, [rooms]);

  const MyMap = useMemo(
    () =>
      dynamic(() => import('@/components/layout/property-detail/Map'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );

  const position = [51.505, -0.09];
  const zoom = 13;
  const inputWidth = useBreakpointValue({ base: '100%', md: '300px' });
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box className="px-4 md:px-16">
      <Link href={'/dashboard'}>
        <HStack my={10}>
          <ArrowLeft size={32} />
          <Heading ml={8} size={'lg'}>
            {property ? property.name : 'Property Details'}
          </Heading>
        </HStack>
      </Link>

      <Image
        src={
          property?.image
            ? `http://localhost:6570/images/${property?.image}`
            : `https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80`
        }
        alt="Green double couch with wooden legs"
        h={400}
        mx={'auto'}
        my={20}
        borderRadius="lg"
      />

      <MyMap position={position} zoom={zoom} />

      <Stack
        my={10}
        justifyContent={'space-between'}
        direction={isMobile ? 'column' : 'row'}
        w="100%"
      >
        <HStack flexWrap={'wrap'}>
          <HStack>
            <InputGroup w={inputWidth}>
              <Input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                value={search}
              />
              <InputRightElement>
                <MagnifyingGlass size={20} />
              </InputRightElement>
            </InputGroup>
            <Hide above="sm">
              <Button
                onClick={onOpen}
                rightIcon={<Plus size={0} />}
                variant="outline"
                fontSize="small"
              >
                Add Room
              </Button>
            </Hide>
          </HStack>

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
        </HStack>

        <HStack>
          <Select
            onChange={(e) => setSortBy(e.target.value)}
            placeholder="Sort By"
            value={sortBy}
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </Select>
          <Button onClick={handleDirections} colorScheme="gray">
            <Hide below="sm">
              {sortDirection === 'asc' ? (
                <SortAscending size={60} />
              ) : (
                <SortDescending size={60} />
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

          <Hide below="sm">
            <Center height="35px" mx={4}>
              <Divider
                border={'1px'}
                borderColor={'black'}
                orientation="vertical"
              />
            </Center>
            <Button
              onClick={onOpen}
              rightIcon={<Plus size={20} />}
              variant="outline"
              px={10}
            >
              Add Room
            </Button>
          </Hide>
        </HStack>
      </Stack>
      <Stack
        justifyContent={'start'}
        gap={8}
        my={8}
        w="100%"
        flexWrap="wrap"
        direction={isMobile ? 'column' : 'row'}
      >
        {rooms.map((item: any) => (
          <CustomCardRoom
            key={item.id}
            id={item.id}
            capacity={item.capacity_person}
            name={item.name}
            price={item.finalPrice}
            startDate={startDate}
            endDate={endDate}
            dashboard
            fetchRooms={fetchRooms}
            image={item.image}
          />
        ))}
      </Stack>

      <SimplePagination page={page} setPage={setPage} maxPage={1} />
      <CommentSection reviews={reviews} />
      <ModalAddRoom
        id={params.id}
        isOpen={isOpen}
        onClose={onClose}
        fetchRooms={fetchRooms}
      />
    </Box>
  );
}
