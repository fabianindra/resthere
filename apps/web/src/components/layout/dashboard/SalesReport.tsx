'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  MagnifyingGlass,
  SortAscending,
  SortDescending,
} from '@phosphor-icons/react/dist/ssr';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const SalesReport = () => {
  const [salesData, setSalesData] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:6570/api/transaction/sales-report',
          {
            params: {
              sortBy,
              sortDirection,
              startDate,
              endDate,
            },
          },
        );
        setSalesData(response.data.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, [sortBy, sortDirection, startDate, endDate]);

  const handleSortDirection = () => {
    setSortDirection((prevDirection) =>
      prevDirection === 'asc' ? 'desc' : 'asc',
    );
  };

  const chartData = {
    labels: salesData.map((transaction) =>
      new Date(transaction.createdAt).toLocaleDateString(),
    ),
    datasets: [
      {
        label: 'Total Sales',
        data: salesData.map((transaction) => transaction.total_price),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sales Over Time',
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
    <Box mb={10} p={5}>
      <HStack my={10} justifyContent="space-between" wrap="wrap">
        <InputGroup w={300} mb={4}>
          <Input
            type="date"
            placeholder="Start Date"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <InputRightElement>
            <MagnifyingGlass size={20} />
          </InputRightElement>
        </InputGroup>
        <InputGroup w={300} mb={4}>
          <Input
            type="date"
            placeholder="End Date"
            onChange={(e) => setEndDate(e.target.value)}
          />
          <InputRightElement>
            <MagnifyingGlass size={20} />
          </InputRightElement>
        </InputGroup>
        <HStack mb={4}>
          <Select onChange={(e) => setSortBy(e.target.value)} placeholder="Sort By">
            <option value="createdAt">Date</option>
            <option value="total_price">Total Sales</option>
          </Select>
          <Button onClick={handleSortDirection} colorScheme="gray">
            {sortDirection === 'asc' ? (
              <SortAscending size={30} />
            ) : (
              <SortDescending size={30} />
            )}
          </Button>
        </HStack>
      </HStack>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Box height="400px">
          <Line data={chartData} options={chartOptions} />
        </Box>
        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Property Name</Th>
                <Th>City</Th>
                <Th>Total Price</Th>
                <Th>User</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {salesData.map((transaction) => (
                <Tr key={transaction.id}>
                  <Td>{transaction.id}</Td>
                  <Td>{transaction.room.property.name}</Td>
                  <Td>{transaction.room.property.city_name}</Td>
                  <Td>{transaction.total_price}</Td>
                  <Td>{transaction.user.username}</Td>
                  <Td>{new Date(transaction.createdAt).toLocaleDateString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default SalesReport;
