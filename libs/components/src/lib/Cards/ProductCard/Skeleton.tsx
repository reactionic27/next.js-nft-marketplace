import { Skeleton, Box, Stack } from '@chakra-ui/react';

export default function ProductCardSkeleton() {
  return (
    <Box boxShadow="lg">
      <Skeleton borderTopRadius="md" h="315px" />
      <Stack p="2">
        <Skeleton h="10px" />
        <Skeleton h="10px" />
        <Skeleton h="25px" />
      </Stack>
    </Box>
  );
}
