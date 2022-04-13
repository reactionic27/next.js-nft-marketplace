import ControlledProductGrid from '@nft-marketplace/components/Grids/ProductGrid/controlled/ControlledProductGrid';
import {
  Heading,
  HStack,
  Link,
  Text,
  Image,
  Box,
  Flex,
} from '@chakra-ui/react';
import Head from 'next/head';

export function Index() {
  return (
    <>
      <Head>
        <title>NFT Marketplace Demo</title>
      </Head>
      <Flex mr="30px" mt="15px" w="50px" marginLeft="auto">
      </Flex>
      <Heading color="black" w="100%" textAlign="center">
        NFT Marketplace Demo
      </Heading>
      <Box
        maxW="1500px"
        mx="auto"
        px={{ base: '4', md: '8', lg: '12' }}
        py={{ base: '6', md: '8', lg: '12' }}
      >
        <ControlledProductGrid />
      </Box>
    </>
  );
}

export default Index;
