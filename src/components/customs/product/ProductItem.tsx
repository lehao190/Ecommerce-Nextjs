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

type Props = {
  name: string;
  price: number;
  starRating?: number;
  image: string;
};

// A component that renders a product card
const ProductItem = ({ name, starRating, price, image }: Props) => {
  return (
    <Card className="h-[270px]">
      <CardHeader className="relative h-[120px]">
        <Image
          src={image}
          alt="Product image"
          fill
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-md">{name}</CardTitle>
        <CardDescription>Lenovo</CardDescription>

        <StarRating starRating={starRating} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-md font-bold text-primary">${price}</p>

        <Button className="h-[45px] rounded-[50%] hover:bg-pink-600">
          <ShoppingCart size={17} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
