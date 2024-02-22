'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addCartItem } from '@/lib/redux/features/cart/cartSlice';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

const QuantityControl = () => {
  const [quantity, setQuantity] = useState(5);
  const quantityInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const addToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(
      addCartItem({
        id: 100,
        name: 'Some product',
        price: 40,
        quantity,
        image:
          'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png'
      })
    );
  };

  return (
    <>
      <div className="flex items-center">
        <div className="flex justify-center items-center border border-gray-600 rounded-lg w-[100px]">
          <button
            onClick={() => {
              if (quantityInputRef.current?.value)
                setQuantity(
                  +quantityInputRef.current.value > 0
                    ? +quantityInputRef.current.value - 1
                    : 0
                );
            }}
            className="text-gray-600 h-[20px] font-bold px-1 py-1 m-1 rounded inline-flex items-center"
          >
            -
          </button>
          <Input
            className="border-0 text-center h-[10px] font-bold"
            type="number"
            ref={quantityInputRef}
            value={quantity}
            onChange={(e) =>
              setQuantity(+e.target.value < 0 ? 0 : +e.target.value)
            }
          />
          <button
            onClick={() => {
              if (quantityInputRef.current?.value)
                setQuantity(+quantityInputRef.current.value + 1);
            }}
            className=" text-gray-600 h-[20px] font-bold px-1 py-1 m-1 rounded inline-flex items-center"
          >
            +
          </button>
        </div>

        <span className="ml-8 font-semibold">In Stock: {100}</span>
      </div>

      <div className="mt-8">
        <Button
          onClick={addToCart}
          type="button"
          className="w-[250px] h-[50px] text-white bg-primary hover:bg-pink-500 focus:ring-4 focus:ring-pink-300 font-medium rounded-full text-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add to cart
        </Button>
      </div>
    </>
  );
};

export default QuantityControl;
