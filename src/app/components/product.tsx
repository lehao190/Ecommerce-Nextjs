'use client';

import {
  Flex,
  Circle,
  Box,
  Image,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';

const data = {
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
  name: 'Wayfarer Classic',
  description:
    'This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design.',
  price: 420.5,
  quantity: 4,
  rating: 5,
  numReviews: 394
};

interface RatingProps {
  rating: number;
  numReviews: number;
}

function Rating({ rating, numReviews }: RatingProps) {
  return (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill('')
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: '1' }}
                color={i < rating ? 'yellow' : 'gray.300'}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: '1' }} color='yellow' />;
          }
          return <BsStar key={i} style={{ marginLeft: '1' }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && 's'}
      </Box>
    </Box>
  );
}

export default function Product() {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      maxWidth="sm"
      borderWidth="1px"
      rounded="lg"
      shadow="md"
      position="relative"
    >
      {data.isNew && (
        <Circle
          size="30px"
          position="absolute"
          top={2}
          right={2}
          bg="pink.400"
          textColor="white"
        >
          {data.quantity}
        </Circle>
      )}

      <Image
        src={data.imageURL}
        alt={`Picture of ${data.name}`}
        roundedTop="lg"
      />

      <Box p="6">
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Box>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {data.name}
            </Text>

            <Text noOfLines={2}>{data.description}</Text>
          </Box>
        </Flex>

        {/* Users' Rating */}
        <Box marginTop={1} marginBottom={1}>
          <Rating rating={data.rating} numReviews={data.numReviews} />
        </Box>

        <Flex justifyContent="space-between" alignItems="center" marginTop="15px">
          <Box fontSize="2xl" color="pink.400">
            ${data.price.toFixed(2)}
          </Box>

          <Tooltip
            label="Add to cart"
            bg="white"
            placement={'top'}
            color={'gray.800'}
            fontSize={'1.2em'}
          >
            <chakra.a href={'#'} display={'flex'}>
              <IconButton 
                aria-label='Add to cart' 
                borderRadius="50%"
                backgroundColor={data.isNew ? 'pink.400' : 'grey'}
                color="white"
                icon={<Icon as={FiShoppingCart} h={5} w={5} alignSelf={'center'} />} 
              />
            </chakra.a>
          </Tooltip>
        </Flex>
      </Box>
    </Box>
  );
}
