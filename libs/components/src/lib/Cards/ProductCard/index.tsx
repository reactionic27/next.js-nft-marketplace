import { Badge, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import { MdOutlineTimelapse } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import Image from 'next/image';

interface ProductCardProps {
  collection: string;
  item: string;
  imageSrc: string;
  width: string;
  height: string;
  contractType: string;
  lastSynced: string;
  likes: number;
}

export default function ProductCard({
  collection,
  item,
  imageSrc,
  width,
  height,
  contractType,
  lastSynced,
  likes,
}: ProductCardProps) {
  return (
    <Flex
      _hover={{ boxShadow: `0 5px 5px rgba(0,0,0,0.15)` }}
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.100"
      direction="column"
      overflow="hidden"
    >
      <Image width={width} height={height} src={imageSrc} alt={item} />
      <Flex
        boxShadow="rgba(0, 0, 0, 0.05) 0px 2px 2px 0px"
        py="2"
        px="3"
        justify="space-between"
      >
        <Stack spacing="-1">
          <Text fontSize="12px" fontWeight="semibold" color="gray.500">
            {collection}
          </Text>
          <Text fontSize="12px" fontWeight="semibold" color="black">
            {item}
          </Text>
        </Stack>
        <Stack mt="1" spacing="0px">
          <Badge textAlign="center" colorScheme="blue">
            {contractType}
          </Badge>
          <HStack spacing="1">
            <MdOutlineTimelapse size="10px" />
            <Text fontSize="xs" color="gray.500">
              {lastSynced}
            </Text>
          </HStack>
        </Stack>
      </Flex>
      <Flex align="center" py="2" px="3" gap="1" marginLeft="auto">
        <AiOutlineHeart size="20px" />
        {likes}
      </Flex>
    </Flex>
  );
}
