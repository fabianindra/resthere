'use client';
import SimplePagination from '@/components/ui/Pagination';
import usePropertyDetail from '@/hooks/usePropertyDetail';
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
} from '@chakra-ui/react';
import {
  MagnifyingGlass,
  SortAscending,
  SortDescending,
  Plus,
} from '@phosphor-icons/react';
import React from 'react';

export default function page() {
  const {
    property,
    rooms,
    page,
    setPage,
    search,
    setSearch,
    category,
    setCategory,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    loading,
    error,
    fetchProperty,
    handleDirections,
  } = usePropertyDetail();
  return (
    <Box className="px-16">
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
          <HStack>
            <Select
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
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
            // onClick={onOpen}
            rightIcon={<Plus size={20} />}
            variant="outline"
          >
            Add Room
          </Button>
        </HStack>
      </HStack>
      <SimplePagination page={page} setPage={setPage} maxPage={1} />
    </Box>
  );
}
