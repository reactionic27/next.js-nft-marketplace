import React from 'react';
import InfiniteScrollButton from '../InfiniteScrollButton';
import useIntersectionObserver, { useListProducts } from '../logic/hooks';

interface IProps {
  loadMoreButtonRef: React.MutableRefObject<HTMLInputElement>;
}

export default function ControlledInfiniteScroll({
  loadMoreButtonRef,
}: IProps) {
  const { isFetchingNextPage, hasNextPage, fetchNextPage } = useListProducts();

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <InfiniteScrollButton
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
}
