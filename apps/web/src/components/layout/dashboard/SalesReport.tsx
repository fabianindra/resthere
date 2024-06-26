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
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sales Over Time',
      },
    },
  };

  return (
    <Box mb={10}>
      <HStack my={20} justifyContent={'space-between'}>
        <Text>Sales Report</Text>
        <InputGroup w={300}>
          <Input
            type="date"
            placeholder="Start Date"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <InputRightElement>
            <MagnifyingGlass size={20} />
          </InputRightElement>
        </InputGroup>
        <InputGroup w={300}>
          <Input
            type="date"
            placeholder="End Date"
            onChange={(e) => setEndDate(e.target.value)}
          />
          <InputRightElement>
            <MagnifyingGlass size={20} />
          </InputRightElement>
        </InputGroup>
        <HStack>
          <Select
            onChange={(e) => setSortBy(e.target.value)}
            placeholder="Sort By"
          >
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
      <Box mb={10}>
        <Line data={chartData} options={chartOptions} />
      </Box>
      <Box overflowX="auto">
        <Table variant="simple">
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
    </Box>
  );
};

export default SalesReport;
