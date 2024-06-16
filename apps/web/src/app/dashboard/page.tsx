'use client';
import React, { useState, useEffect } from 'react';
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
  useDisclosure, VStack, Text
} from '@chakra-ui/react';
import {
  MagnifyingGlass,
  Plus,
  SortAscending,
  SortDescending,
} from '@phosphor-icons/react/dist/ssr';
import usePropertyData from '../../hooks/property/usePropertyData';
import ModalAddProperty from '../../components/layout/dashboard/ModalAddProperty';
import { verifyTokenClient } from '../verifyToken';
import Link from 'next/link';
import ChangePasswordModal from '@/components/layout/profile/changePassword';

export default function Page() {
  const { isOpen: isAddPropertyModalOpen, onOpen: onAddPropertyModalOpen, onClose: onAddPropertyModalClose } = useDisclosure();
  const { isOpen: isChangePasswordModalOpen, onOpen: onChangePasswordModalOpen, onClose: onChangePasswordModalClose } = useDisclosure();
  
  const [verified, setVerified] = useState(false);
  const {
    dataRoom,
    page,
    setPage,
    maxPage,
    search,
    setSearch,
    setSortBy,
    setCategory,
    sortDirection,
    handleDirections,
  } = usePropertyData();

  useEffect(() => {
    const verifyAndSet = async () => {
        try {
            const isValidToken = await verifyTokenClient();
            setVerified(isValidToken)
            //check verified
            console.log(isValidToken)

        } catch (error) {
            console.error("Error verifying token:", error);
            setVerified(false);
        }
    };
    verifyAndSet();
}, []);

if (!verified) {
  return (
      <div>
        <VStack mt={100} mb={200}>
          <Text>You are not authorized. Please log in to access this page.</Text>
          <Link href="/">Go to Home Page</Link>
        </VStack>
      </div>
  );
} 

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
            onClick={onAddPropertyModalOpen}
            rightIcon={<Plus size={20} />}
            variant="outline"
          >
            Add Property
          </Button>
          {/* Button to open ChangePasswordModal */}
          <Button onClick={onChangePasswordModalOpen}>Change Password</Button>
        </HStack>
      </HStack>
      <HStack justifyContent={'start'} gap={8} my={10}>
        {dataRoom.length === 0
          ? null
          : dataRoom.map((item: any) => (
              <CustomCard
                key={item.id}
                id={item.id}
                city={item.city_name}
                name={item.name}
                price={item.rooms[0] ? item.rooms[0].price : 0}
                dashboard={true}
              />
            ))}
      </HStack>
      <SimplePagination page={page} setPage={setPage} maxPage={maxPage} />
      <ChangePasswordModal isOpen={isChangePasswordModalOpen} onClose={onChangePasswordModalClose} />
      {/* Render the ModalAddProperty component */}
      <ModalAddProperty isOpen={isAddPropertyModalOpen} onClose={onAddPropertyModalClose} />
    </Box>
  );
}
