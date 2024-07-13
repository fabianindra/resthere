import {
  Card,
  CardBody,
  HStack,
  Heading,
  CardFooter,
  Box,
  Image,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { MapPin, Star } from '@phosphor-icons/react';
import { PencilSimple, TrashSimple } from '@phosphor-icons/react/dist/ssr';
import React from 'react';
import ModalEditProperty from '../layout/dashboard/ModalEditProperty';
import ModalDeleteProperty from '../layout/dashboard/ModalDeleteProperty';
import Link from 'next/link';
import { imageUrl } from '@/api';

export default function CustomCard({
  id,
  city,
  name,
  price,
  dashboard,
  fetchData,
  startDate,
  endDate,
  image,
}: {
  id: number;
  city: string;
  name: string;
  price: number;
  dashboard: boolean;
  startDate: Date | null;
  endDate: Date | null;
  date?: string;
  user?: string;
  fetchData: any;
  image: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formatDate = (date: Date | null): string => {
    return date instanceof Date && !isNaN(date.getTime())
      ? date.toISOString().split('T')[0]
      : '';
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <Card maxW="xs">
      <CardBody>
        <Image
          src={
            image
              ? `${imageUrl}/${image}`
              : `https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80`
          }
          objectFit="cover"
          height={200}
          width={400}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <HStack mt={4} color={'gray.400'}>
          <MapPin size={20} weight="fill" />
          <Text fontSize={'sm'}>{city}</Text>
        </HStack>
        <Link
          href={{
            pathname: dashboard
              ? `/detail-property/${id}`
              : `/list-property/${id}`,
            query: { startDate: formattedStartDate, endDate: formattedEndDate },
          }}
          passHref
        >
          <Heading size="md" mt={4}>
            {name}
          </Heading>
        </Link>
      </CardBody>
      <CardFooter flexDirection={'column'}>
        <HStack justifyContent={'space-between'}>
          <HStack>
            <Star size={20} weight="fill" />
            <Text fontSize={'sm'}>5.0 (Review)</Text>
          </HStack>
          <Box>
            <Text fontSize={'md'} fontWeight={'bold'}>
              Rp. {price}
            </Text>
          </Box>
        </HStack>
        {dashboard ? (
          <HStack justifyContent={'end'} mb={4} mt={10}>
            <Button
              onClick={onOpen}
              rightIcon={<PencilSimple size={20} />}
              colorScheme="blue"
            >
              Edit
            </Button>
            <ModalDeleteProperty id={id} fetchData={fetchData} />
          </HStack>
        ) : null}
      </CardFooter>
      <ModalEditProperty
        id={id}
        isOpen={isOpen}
        onClose={onClose}
        fetchData={fetchData}
      />
    </Card>
  );
}
