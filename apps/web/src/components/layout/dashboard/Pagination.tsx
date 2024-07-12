import React from 'react';
import { HStack, Button, Text } from '@chakra-ui/react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => (
  <HStack justify="center" mt={4}>
    <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
    <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
    <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</Button>
  </HStack>
);

export default Pagination;
