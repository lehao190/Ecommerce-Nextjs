'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import StarRating from './StarRating';
import Link from 'next/link';

type Props = {
  id: number;
  name: string;
  price: number;
  starRating?: number;
  image: string;
};

// A component that renders a product card
const ProductItem = ({ id, name, starRating, price, image }: Props) => {
  const addToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log('Add to cart');
  };

  return (
    <Card className="h-[270px]">
      <Link href={`/product/${id}`}>
        <CardHeader className="relative h-[120px]">
          <Image
            src={image}
            alt="Product image"
            fill
            sizes="(max-width: 768px) 30vw, 33vw"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-md">{name}</CardTitle>
          <CardDescription>Lenovo</CardDescription>

          <StarRating starRating={starRating} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-md font-bold text-primary">${price}</p>

          <Button
            className="h-[45px] rounded-[50%] hover:bg-pink-600"
            onClick={addToCart}
          >
            <ShoppingCart size={17} />
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductItem;
