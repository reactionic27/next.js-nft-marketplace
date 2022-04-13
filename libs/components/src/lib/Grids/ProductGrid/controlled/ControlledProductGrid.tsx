import { Flex } from '@chakra-ui/react';
import React from 'react';
import Grid from '../../../SimpleGrid';
import ProductCard from '../../../Cards/ProductCard';
import ProductCardSkeleton from '../../../Cards/ProductCard/Skeleton';
import { useListProducts } from '../logic/hooks';
import ControlledInfiniteScroll from './ControlledInfiniteScroll';

interface Product {
  collection: string;
  image: string;
  name: string;
  symbol: string;
  contractType: string;
  lastSynced: string;
}

export default function ControlledProductGrid() {
  const { data, isLoading } = useListProducts();

  const loadMoreButtonRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <>
      {!isLoading && (
        <>
          <Grid>
            {data?.map((product: Product) => (
              <ProductCard
                key={product.name}
                imageSrc={product.image}
                width="315px"
                height="315px"
                collection={product.collection}
                item={product.name}
                contractType={product.contractType}
                lastSynced={product.lastSynced}
                likes={Math.floor(Math.random() * 10)}
              />
            ))}
          </Grid>
          <Flex mt="5" ref={loadMoreButtonRef}>
            <ControlledInfiniteScroll loadMoreButtonRef={loadMoreButtonRef} />
          </Flex>
        </>
      )}
      {isLoading && (
        <Grid>
          {[...Array(12).keys()].map((key) => (
            <ProductCardSkeleton key={key} />
          ))}
        </Grid>
      )}
    </>
  );
}
