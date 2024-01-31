'use client';

import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import CartItem from '@/components/customs/cart/CartItem';

// Cart items type
export type TCartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

// A mock data for the items in the cart
const items: TCartItem[] = [
  {
    id: 1,
    name: 'iPhone 13',
    price: 999,
    quantity: 4,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/airpods-max.png'
  },
  {
    id: 2,
    name: 'MacBook Pro',
    price: 1999,
    quantity: 1,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/15-inch-macbook-air-2tb-midnight.png'
  },
  {
    id: 3,
    name: 'AirPods Pro',
    price: 249,
    quantity: 3,
    image:
      'https://raw.githubusercontent.com/adrianhajdin/ecommerce/main/public/admin%20ui/products/13-inch-macbokk-air-256gb-space-gray.png'
  }
];

// The main component for the cart page
const CartPage = () => {
  // A state for storing the items in the cart
  const [cartItems, setCartItems] = useState(items);

  // A function for removing an item from the cart by id
  const handleRemove = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // A function for calculating the total price of the items in the cart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // A function for decreasing the quantity of an item by id
  const onDecrease = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity > 0 ? --item.quantity : 0 } : item
      )
    );
  };

  // // A function for increasing the quantity of an item by id
  const onIncrease = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: ++item.quantity } : item
      )
    );
  };

  // A function for changing the quantity of an item by id and value
  const onQuantityChange = (id: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity < 0 ? 0 : quantity } : item
      )
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <div className="grid lg:grid-cols-12 sm:grid-cols-6 gap-8">
        <div className="lg:col-span-8 sm:col-span-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onDecrease={onDecrease}
                onIncrease={onIncrease}
                onQuantityChange={onQuantityChange}
              />
            ))
          ) : (
            <p className="text-center text-gray-400">Your cart is empty.</p>
          )}
        </div>

        <div className="lg:col-span-4 sm:col-span-6">
          <div className="p-4 bg-white border">
            <h2 className="text-xl font-bold mb-2">Order Summary</h2>

            <Separator className="my-3" />

            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500">Subtotal</p>
              <p className="text-gray-700">${getTotalPrice()}</p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500">Shipping</p>
              <p className="text-gray-700">Free</p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500">Tax</p>
              <p className="text-gray-700">$0</p>
            </div>

            <Separator className="my-3" />

            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-semibold">Total</p>
              <p className="text-lg font-semibold">${getTotalPrice()}</p>
            </div>

            <button className="w-full py-2 text-white rounded bg-primary hover:bg-pink-600">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
