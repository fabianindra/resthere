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
} from '@chakra-ui/react';
import {
  MagnifyingGlass,
  SortAscending,
  SortDescending,
  Plus,
} from '@phosphor-icons/react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ModalAddRoom from '@/components/layout/property-detail/ModalAddRoom';
import CustomCardRoom from '@/components/layout/property-detail/CustomCardRoom';

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
    fetchProperty,
  } = usePropertyDetails();
  const {
    rooms,
    loading: roomsLoading,
    error: roomsError,
    fetchRooms,
  } = useRoomsData(propertyId, page, search, category, sortBy, sortDirection);

  const handleDirections = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    fetchProperty(parseInt(params.id));
    setPropertyId(parseInt(params.id));
  }, []);

  useEffect(() => {
    if (propertyId) {
      fetchRooms();
    }
  }, [propertyId, page, search, category, sortBy, sortDirection]);

  return (
    <Box className="px-16">
      <HStack my={20} justifyContent={'space-between'}>
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
          <HStack>
            <Select
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              value={category}
            >
              <option value="Hotel">Hotel</option>
              <option value="Vila">Vila</option>
              <option value="Home Stay">Home Stay</option>
            </Select>
          </HStack>
          <Button onClick={handleDirections} colorScheme="gray">
            {sortDirection === 'asc' ? (
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
      <HStack justifyContent={'start'} gap={8} my={10}>
        {rooms.map((item: any) => (
          <CustomCardRoom
            key={item.id}
            id={item.id}
            capacity={item.capacity_person}
            name={item.name}
            price={item.price}
            dashboard
          />
        ))}
      </HStack>

      <SimplePagination page={page} setPage={setPage} maxPage={1} />
      <ModalAddRoom id={params.id} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}