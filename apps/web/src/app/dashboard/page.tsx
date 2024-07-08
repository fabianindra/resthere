'use client';
import React, { useState, useEffect } from 'react';
import CustomCard from '@/components/ui/CustomCard';
import SimplePagination from '@/components/ui/Pagination';
import {
  Box,
  Tab,
  TabPanel,
  Tabs,
  TabList,
  TabPanels,
  Button,
  Center,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  useDisclosure,
  VStack,
  Text,
  Heading,
  Hide,
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
import TenantBookingList from '@/components/layout/dashboard/TenantBookingList';
import SalesReport from '@/components/layout/dashboard/SalesReport';
import Cookies from 'js-cookie';
import { User } from '@/types';
import TenantProfile from '@/components/layout/dashboard/TenantProfile';

export default function DashboardPage() {
  const {
    isOpen: isAddPropertyModalOpen,
    onOpen: onAddPropertyModalOpen,
    onClose: onAddPropertyModalClose,
  } = useDisclosure();
  const {
    isOpen: isChangePasswordModalOpen,
    onOpen: onChangePasswordModalOpen,
    onClose: onChangePasswordModalClose,
  } = useDisclosure();

  const [verified, setVerified] = useState<any>(false);
  const [role, setRole] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const {
    dataRoom,
    page,
    setPage,
    maxPage,
    search,
    setSearch,
    setSortBy,
    setCategory,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    sortDirection,
    handleDirections,
    fetchData,
  } = usePropertyData();

  useEffect(() => {
    const storedUser = Cookies.get('user');
    const storedRole = Cookies.get('role');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    if (storedRole) {
      setRole(storedRole);
    } else {
      setRole('');
    }
  }, []);

  useEffect(() => {
    console.log(dataRoom);
  }, [dataRoom]);

  useEffect(() => {
    const verifyAndSet = async () => {
      try {
        const isValidToken: boolean = await verifyTokenClient();
        setVerified(isValidToken);
      } catch (error) {
        console.error('Error verifying token:', error);
        setVerified(false);
      }
    };
    verifyAndSet();
  }, []);

  if (verified == null) {
    return (
      <Center mt={100} mb={200}>
        <Text>Loading...</Text>
      </Center>
    );
  }

  if (!verified || role !== 'tenant') {
    return (
      <VStack mt={100} mb={200}>
        <Text>You are not authorized. Please log in to access this page.</Text>
        <Link href="/">Go to Home Page</Link>
      </VStack>
    );
  }

  return (
    <Box px={{ base: '10px', sm: '64px' }}>
      <Tabs isFitted variant="enclosed">
        <TabList display={'flex'} flexWrap={'wrap'} mb="1em">
          <Tab>Properties</Tab>
          <Tab>Transaction</Tab>
          <Tab>Sales Report</Tab>
          <Tab>Tenant Profile</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HStack my={10} justifyContent={'space-between'}>
              <Heading size={{ base: 'md', sm: 'lg' }}>Property List</Heading>
              <Button
                onClick={onAddPropertyModalOpen}
                rightIcon={<Plus size={20} />}
                variant="outline"
              >
                Add Property
              </Button>
            </HStack>
            <HStack my={10} flexWrap={'wrap'} justifyContent={'space-between'}>
              <HStack>
                <HStack flexWrap={{ base: 'wrap', sm: 'nowrap' }}>
                  <Input
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                    placeholder="start date"
                    size="md"
                    type="date"
                  />
                  <Hide below="sm">
                    <Box w={10} className="border-b border-[#000000]" />
                  </Hide>
                  <Input
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                    placeholder="end date"
                    size="md"
                    type="date"
                  />
                </HStack>
              </HStack>
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
                  {sortDirection == 'asc' ? (
                    <SortAscending size={30} />
                  ) : (
                    <SortDescending size={30} />
                  )}
                </Button>
              </HStack>
            </HStack>

            <HStack
              w={'100vw'}
              flexWrap={'wrap'}
              justifyContent={'start'}
              gap={4}
              my={10}
            >
              {dataRoom.length === 0 ? (
                <Text>No properties found</Text>
              ) : (
                dataRoom.map((item: any) => (
                  <CustomCard
                    key={item.id}
                    id={item.id}
                    city={item.city_name}
                    name={item.name}
                    price={item.rooms[0] ? item.rooms[0].price : 0}
                    dashboard={true}
                    fetchData={fetchData}
                    startDate={new Date(startDate)}
                    endDate={new Date(endDate)}
                    image={item.image}
                  />
                ))
              )}
            </HStack>
            <SimplePagination page={page} setPage={setPage} maxPage={maxPage} />
          </TabPanel>
          <TabPanel>
            <TenantBookingList />
          </TabPanel>
          <TabPanel>
            <SalesReport />
          </TabPanel>
          <TabPanel>
            <TenantProfile />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={onChangePasswordModalClose}
      />
      <ModalAddProperty
        isOpen={isAddPropertyModalOpen}
        onClose={onAddPropertyModalClose}
        fetchData={fetchData}
      />
    </Box>
  );
}
