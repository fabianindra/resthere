'use client';
import DateRangePicker from '@/components/layout/home/DateRangePicker';
import GuestBox from '@/components/layout/home/GuestBox';
import LocationBox from '@/components/layout/home/LocationBox';
import SearchButton from '@/components/layout/home/SearchButton';
import SimplePagination from '@/components/ui/Pagination';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  HStack,
  Heading,
  Stack,
  Text,
  Image,
} from '@chakra-ui/react';
import React, { useState } from 'react';

export default function page() {
  const [guest, setGuest] = useState(1);
  return (
    <Box className="mx-10">
      <HStack flexWrap={'wrap'} mt={10}>
        <LocationBox location="Semarang, Jawa Tengah, Indonesia" />
        <GuestBox set={setGuest} guestCount={guest} />
        <HStack
          gap={20}
          flexWrap={'wrap'}
          className="py-4 px-8 border-2 border-solid border-gray text-start flex-2"
        >
          <DateRangePicker label="from" />
          <DateRangePicker label="until" />
        </HStack>
        <SearchButton />
      </HStack>
      <HStack mt={10}>
        <Card maxW="sm">
          <CardBody>
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">Living room Sofa</Heading>
              <Text>
                This sofa is perfect for modern tropical spaces, baroque
                inspired spaces, earthy toned spaces and for people who love a
                chic design with a sprinkle of vintage design.
              </Text>
              <Text color="blue.600" fontSize="2xl">
                $450
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button variant="solid" colorScheme="blue">
                Buy now
              </Button>
              <Button variant="ghost" colorScheme="blue">
                Add to cart
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </HStack>
      <SimplePagination page={page} setPage={''} maxPage={10} />
    </Box>
  );
}
