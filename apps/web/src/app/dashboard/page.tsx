'use client';
import React from 'react';
import CustomCard from '@/components/ui/CustomCard';
import SimplePagination from '@/components/ui/Pagination';
import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import {
  MagnifyingGlass,
  Plus,
  SortAscending,
  SortDescending,
} from '@phosphor-icons/react/dist/ssr';
import usePropertyData from '../../hooks/usePropertyData';
import ModalAddProperty from '../../components/layout/dashboard/ModalAddProperty';

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    dataRoom,
    page,
    setPage,
    maxPage,
    search,
    setSearch,
    sortBy,
    setSortBy,
    sortDirection,
    handleDirections,
  } = usePropertyData();

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
            Add Property
          </Button>
        </HStack>
      </HStack>
      <HStack justifyContent={'start'} gap={8} my={10}>
        {dataRoom.length === 0
          ? null
          : dataRoom.map((item: any) => (
              <CustomCard
                key={item.id}
                city={item.city_name}
                name={item.name}
                price={item.rooms[0] ? item.rooms[0].price : 0}
                dashboard={true}
              />
            ))}
      </HStack>
      <SimplePagination page={page} setPage={setPage} maxPage={maxPage} />
      <ModalAddProperty isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
