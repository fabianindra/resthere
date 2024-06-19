'use client';
import CustomCardRoom from '@/components/layout/property-detail/CustomCardRoom';
import CustomCard from '@/components/ui/CustomCard';
import SimplePagination from '@/components/ui/Pagination';
import usePropertyAll from '@/hooks/property/usePropertyAll';
import usePropertyData from '@/hooks/property/usePropertyData';
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
  Link,
  Heading,
} from '@chakra-ui/react';
import {
  MagnifyingGlass,
  SortAscending,
  SortDescending,
} from '@phosphor-icons/react';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function page() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [propertyId, setPropertyId] = useState<number>(0);
  const params: { id: string } = useParams<{ id: string }>();

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
  } = useRoomsData(propertyId, page, search, category, sortBy, sortDirection);

  const handleDirections = () => {
    setSortDirection((prev) => (prev == 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    if (propertyId) {
      fetchRooms();
    }
  }, [propertyId, page, search, category, sortBy, sortDirection]);

  useEffect(() => {
    fetchProperty(parseInt(params.id));
    setPropertyId(parseInt(params.id));
  }, []);
  return (
    <Box className="px-16">
      <Link href={'/list-property'}>
        <HStack my={10}>
          <ArrowLeft size={32} />
          <Heading ml={8} size={'lg'}>
            {property ? property.name : 'Property Details'}
          </Heading>
        </HStack>
      </Link>
      <HStack my={20} justifyContent={'space-between'}>
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
            <Select
              onChange={(e) => setSortBy(e.target.value)}
              placeholder="Sort By"
            >
              <option value="name">name</option>
              <option value="price">price</option>
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
            dashboard={false}
          />
        ))}
      </HStack>
      <SimplePagination page={page} setPage={setPage} maxPage={1} />
    </Box>
  );
}
