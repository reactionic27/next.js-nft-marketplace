import { Button } from '@chakra-ui/react';

export default function InfiniteScrollButton({
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: {
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: VoidFunction;
}) {
  return (
    <>
      {isFetchingNextPage && (
        <Button
          fontSize="sm"
          _hover={{ bg: 'transparent' }}
          variant="ghost"
          isFullWidth
        >
          Loading...
        </Button>
      )}
      {hasNextPage && !isFetchingNextPage && (
        <Button
          fontSize="sm"
          _hover={{ bg: 'transparent' }}
          variant="ghost"
          isFullWidth
          onClick={() => fetchNextPage()}
        >
          Load more
        </Button>
      )}
    </>
  );
}
