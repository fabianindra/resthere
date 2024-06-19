import { Box, HStack, Heading, Text } from '@chakra-ui/react';

export default function SimplePagination(props: any) {
  const { page, setPage, maxPage } = props;
  return (
    <Box className="flex mt-8 mb-16 text-black">
      <button
        onClick={() => (page >= 2 ? setPage(page - 1) : null)}
        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
      >
        Previous
      </button>
      <HStack textAlign={'center'} mx={4}>
        <Text fontSize={'md'}>Page</Text>
        <Heading as="h1" size="md">
          {page ? page : 0}
        </Heading>
        <Text fontSize={'md'}>of {maxPage ? maxPage : 0} Page</Text>
      </HStack>
      <button
        onClick={() => (page <= maxPage - 1 ? setPage(page + 1) : null)}
        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
      >
        Next
      </button>
    </Box>
  );
}
