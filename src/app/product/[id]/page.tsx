'use client';

import StarRating from '@/components/customs/product/StarRating';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useState } from 'react';
import FormComponent from '@/components/customs/forms/Form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Comment from '@/components/customs/product/comment/Comment';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Props = {
  params: {
    id: string;
  };
};

const commentSchema = z.object({
  comment: z.string().min(8, {
    message: 'Comment must be at leaset 8 characters.'
  }),
  rating: z.number()
});

// Login form's fields
type TCommentFields = z.infer<typeof commentSchema>;

const Product = ({ params }: Props) => {
  const [quantity, setQuantity] = useState('4');

  const form = useForm<TCommentFields>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: '',
      rating: 0
    }
  });

  const onSubmit = async (values: TCommentFields) => {
    console.log('Submit Comment: ', values);
  };

  return (
    <div className="container mx-auto py-8">
      {/* <h1 className="text-3xl font-bold mb-10">Product</h1> */}

      {/* Product details */}
      <section className="md:flex gap-8">
        <div className="grow max-w-[400px] h-[350px] relative mx-auto">
          <Image
            src={
              'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png'
            }
            alt="Product image"
            fill
            sizes="(max-width: 768px) 30vw, 33vw"
            priority
          />
        </div>

        <div className="sm:max-w-[480px] lg:max-w-[750px] mt-8 md:mt-0">
          <h2 className="text-3xl font-semibold tracking-tight">
            Zip Tote Basket
          </h2>
          <h3 className="text-2xl text-primary font-semibold tracking-tight my-1">
            $314
          </h3>

          <div className="flex items-center">
            <StarRating starRating={4} />
            <span className="ml-3 pt-1 text-sm text-gray-400">
              {10} Reviews
            </span>
          </div>

          <div className="my-3">
            The Zip Tote Basket is the perfect midpoint between shopping tote
            and comfy backpack. With convertible straps, you can hand carry,
            should sling, or backpack this convenient and spacious bag. The zip
            top and durable canvas construction keeps your goods protected for
            all-day use.
          </div>

          <div className="flex items-center">
            <div className="flex justify-center items-center border border-gray-600 rounded-lg w-[100px]">
              <button className="text-gray-600 h-[20px] font-bold px-1 py-1 m-1 rounded inline-flex items-center">
                -
              </button>
              <Input
                className="border-0 text-center h-[10px] font-bold"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button className=" text-gray-600 h-[20px] font-bold px-1 py-1 m-1 rounded inline-flex items-center">
                +
              </button>
            </div>

            <span className="ml-8 font-semibold">In Stock: {100}</span>
          </div>

          <div className="mt-8">
            <Button
              type="button"
              className="w-[250px] h-[50px] text-white bg-primary hover:bg-pink-500 focus:ring-4 focus:ring-pink-300 font-medium rounded-full text-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </section>

      <div className="font-bold text-xl mt-8 mb-4">SUBMIT YOUR REVIEW</div>

      {/* Reviews Form */}
      <section className="max-w-[400px]">
        {/* <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            You need to login to be able to review.
          </AlertDescription>
        </Alert> */}

        <FormComponent<TCommentFields>
          fieldNames={[
            {
              field: 'rating',
              type: 'number'
            },
            {
              field: 'comment',
              type: 'textarea'
            }
          ]}
          form={form}
          onSubmit={onSubmit}
        >
          <Button
            type="submit"
            className="text-white bg-primary hover:bg-pink-500 focus:ring-4 focus:ring-pink-300 font-medium rounded-full text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </Button>
        </FormComponent>
      </section>

      <div className="font-bold text-xl mt-8 mb-4">REVIEWS</div>

      {/* User Reviews */}
      <section className="max-w-[1000px] flex flex-col gap-10">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </section>
    </div>
  );
};

export default Product;
