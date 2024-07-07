import { Box, Heading, HStack, Avatar, Text } from '@chakra-ui/react';
import { Star } from '@phosphor-icons/react/dist/ssr';

export default function CommentSection({ reviews }: any) {
  return (
    <Box className="border-solid border-2 border-[#94a3b8] rounded-md p-8">
      <Heading>Comments</Heading>
      <Box maxHeight="500px" overflowY="auto" mt={4}>
        <HStack flexWrap={'wrap'} spacing={4}>
          {reviews.map((item: any) => (
            <Box
              key={item.id}
              my={4}
              w={{ base: '100%', md: '440px' }}
              h="auto"
              className="shadow-xl p-8 rounded-lg"
            >
              <HStack>
                <Avatar bg="teal.500" />
                <Heading ml={2} size={'md'}>
                  {item.username || 'Anonymous'}
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
