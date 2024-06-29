'use client';
import CustomCardRoom from '@/components/layout/property-detail/CustomCardRoom';
import SimplePagination from '@/components/ui/Pagination';
import useGetReviews from '@/hooks/list-property/getReviewProperty';
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
  Avatar,
  Text,
} from '@chakra-ui/react';
import {
  MagnifyingGlass,
  SortAscending,
  SortDescending,
} from '@phosphor-icons/react';
import { ArrowLeft, Star } from '@phosphor-icons/react/dist/ssr';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
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
  const { fetchReviews, reviews, loading, error } = useGetReviews();
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
    '',
    '',
  );

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
    fetchReviews(parseInt(params.id));
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
      <Box className="border-solid border-2 border-[#94a3b8] rounded-md  p-8">
        <Heading>Coment</Heading>
        <HStack flexWrap={'wrap'}>
          {reviews.map((item: any) => (
            <Box
              key={item.id}
              my={10}
              w={440}
              h={220}
              className="shadow-xl p-8 rounded-lg"
            >
              <HStack>
                <Avatar bg="teal.500" />
                <Heading ml={1} size={'md'}>
                  username
                </Heading>
              </HStack>
              <Box>
                <HStack my={4} w={'100%'}>
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      weight="fill"
                      className={`h-6 w-6 transition-colors ${
                        index < item.star
                          ? 'text-[#facc15] hover:text-[#facc15]'
                          : 'text-[#9ca3af] hover:text-[#facc15]'
                      }`}
                    />
                  ))}
                </HStack>
                <Text className="line-clamp-3" fontSize="md">
                  {item.feed_back}
                </Text>
              </Box>
            </Box>
          ))}
        </HStack>
      </Box>
    </Box>
  );
}
