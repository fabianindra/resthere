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
// import MyMap from '@/components/layout/property-detail/Map';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import dynamic from 'next/dynamic';

export default function Page() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [propertyId, setPropertyId] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>(null); // Updated to Date | null
  const [endDate, setEndDate] = useState<Date | null>(null);
  const params: { id: string } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    property,
    loading: propertyLoading,
    error: propertyError,
    fetchProperty,
  } = usePropertyDetails();
  const {
    rooms,
    loading: roomsLoading,
    error: roomsError,
    fetchRooms,
  } = useRoomsData(
    propertyId,
    page,
    search,
    category,
    sortBy,
    sortDirection,
    startDate,
    endDate,
  );

  const handleDirections = () => {
    setSortDirection((prev) => (prev == 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    fetchProperty(parseInt(params.id));
    setPropertyId(parseInt(params.id));
  }, []);

  useEffect(() => {
    if (propertyId) {
      fetchRooms();
    }
    //console.log(search);
  }, [propertyId, page, search, category, sortBy, sortDirection]);

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

  return (
    <Box className="px-16">
      <Link href={'/dashboard'}>
        <HStack my={10}>
          <ArrowLeft size={32} />
          <Heading ml={8} size={'lg'}>
            {property ? property.name : 'Property Details'}
          </Heading>
        </HStack>
      </Link>

      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
        h={400}
        mx={'auto'}
        my={20}
        borderRadius="lg"
      />

      <MyMap position={position} zoom={zoom} />

      <HStack my={10} justifyContent={'space-between'}>
        <HStack>
          <HStack>
          <Input
            onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
            value={startDate ? startDate.toISOString().split('T')[0] : ''}
            placeholder="Select Date and Time"
            size="md"
            type="date"
          />
          <Input
            onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
            value={endDate ? endDate.toISOString().split('T')[0] : ''}
            placeholder="Select Date and Time"
            size="md"
            type="date"
          />
          </HStack>
          <InputGroup w={300}>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              value={search}
            />
            <InputRightElement>
              <MagnifyingGlass size={20} />
            </InputRightElement>
          </InputGroup>
        </HStack>

        <HStack>
          <HStack>
            <Select
              onChange={(e) => setSortBy(e.target.value)}
              placeholder="Sort By"
              value={sortBy}
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
            </Select>
          </HStack>
          <Button onClick={handleDirections} colorScheme="gray">
            {sortDirection == 'asc' ? (
              <SortAscending size={30} />
            ) : (
              <SortDescending size={30} />
            )}
          </Button>
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
          >
            Add Room
          </Button>
        </HStack>
      </HStack>
      <HStack justifyContent={'start'} gap={8} my={8}>
        {rooms.map((item: any) => (
          <CustomCardRoom
            key={item.id}
            id={item.id}
            capacity={item.capacity_person}
            name={item.name}
            price={item.price}
            startDate={startDate}
            endDate={endDate}
            dashboard
          />
        ))}
      </HStack>

      <SimplePagination page={page} setPage={setPage} maxPage={1} />
      <ModalAddRoom id={params.id} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
