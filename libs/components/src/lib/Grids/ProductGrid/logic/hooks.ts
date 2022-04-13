import { useEffect } from 'react';
import { InfiniteData, useInfiniteQuery } from 'react-query';
import { api } from '../utils/api';

interface Observer<T = HTMLElement, U = HTMLInputElement> {
  root?: React.MutableRefObject<T>;
  target: React.MutableRefObject<U>;
  onIntersect: VoidFunction;
  threshold?: number;
  rootMargin?: string;
  enabled: boolean | undefined;
}

const listProductsApi = <T extends { pageParam?: string }>(params?: T) =>
  api({
    url: 'https://api.buildable.dev/flow/v1/call/live/fork-opensea-nft-marketplace-2ad93b5952',
    method: 'POST',
    payload: {
      cursor: params?.pageParam,
      pageSize: 12,
    },
  });

export const useListProducts = () => {
  const { data, ...rest } = useInfiniteQuery(
    ['opensea-collection-items'],
    listProductsApi,
    {
      staleTime: 5 * 60 * 1000,
      retry: false,
      getNextPageParam({ page, total, cursor }) {
        if (page < total) {
          return cursor;
        }
        return undefined;
      },
    }
  );

  interface InfiniteDataProps {
    rows: {
      collection: string;
      image: string;
      name: string;
      symbol: string;
      contractType: string;
      lastSynced: string;
    };
  }

  function mergedPages(data: InfiniteData<InfiniteDataProps> | undefined) {
    return data?.pages?.flatMap((page) => page?.rows);
  }

  const finalData = mergedPages(data);

  return { data: finalData, ...rest };
};

export default function useIntersectionObserver({
  enabled = true,
  onIntersect,
  root,
  rootMargin = '0px',
  target,
  threshold = 0.1,
}: Observer) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root?.current,
        rootMargin,
        threshold,
      }
    );

    const el = target?.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [enabled, root, rootMargin, threshold, target, onIntersect]);
}
