'use client';

import React, { useState } from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// A mock data for the items in the cart
const items = [
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
  const handleRemove = (id: any) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // A function for calculating the total price of the items in the cart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  // A function for decreasing the quantity of an item by id
  const onDecrease = (id: any) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  // A function for increasing the quantity of an item by id
  const onIncrease = (id: any) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // A function for changing the quantity of an item by id and value
  const onQuantityChange = (id: any, value: any) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: value } : item
      )
    );
  };

  // A custom component for rendering each item in the cart
  // const CartItem = ({ item, onRemove }: any) => {
  //   return (
  //     <div className="flex items-center justify-between p-4 bg-white border-b">
  //       <div className="flex items-center w-1/2">
  //         <img
  //           src={item.image}
  //           alt={item.name}
  //           className="w-16 h-16 object-cover mr-4"
  //         />
  //         <div>
  //           <h3 className="text-lg font-semibold">{item.name}</h3>
  //           <p className="text-gray-500">${item.price}</p>
  //         </div>

  //         <div className="border border-gray-600 rounded-lg">
  //           <button
  //             onClick={() => onDecrease(item.id)}
  //             className="text-gray-600 h-[20px] font-bold px-1 py-1 m-1 rounded inline-flex items-center"
  //           >
  //             -
  //           </button>
  //           <input
  //             type="text"
  //             value={0}
  //             onChange={(e) => onQuantityChange(item.id, e.target.value)}
  //             className="w-12 text-center"
  //           />
  //           <button
  //             onClick={() => onIncrease(item.id)}
  //             className=" text-gray-600 h-[20px] font-bold px-1 py-1 m-1 rounded inline-flex items-center"
  //           >
  //             +
  //           </button>
  //         </div>
  //       </div>

  //       <div className="hidden md:flex items-center">
  //         <div className="border border-gray-600 rounded-lg">
  //           <button
  //             onClick={() => onDecrease(item.id)}
  //             className="text-gray-600 h-[20px] font-bold px-1 py-1 m-1 rounded inline-flex items-center"
  //           >
  //             -
  //           </button>
  //           <input
  //             type="text"
  //             value={0}
  //             onChange={(e) => onQuantityChange(item.id, e.target.value)}
  //             className="w-12 text-center"
  //           />
  //           <button
  //             onClick={() => onIncrease(item.id)}
  //             className=" text-gray-600 h-[20px] font-bold px-1 py-1 m-1 rounded inline-flex items-center"
  //           >
  //             +
  //           </button>
  //         </div>
  //       </div>

  //       <div className="hidden md:flex items-center font-semibold">${item.price}</div>

  //       <button
  //         onClick={() => onRemove(item.id)}
  //         className="hidden md:flex items-center text-red-500 hover:text-red-700"
  //       >
  //         <Trash2 size={20} />
  //       </button>
  //     </div>
  //   );
  // };

  const CartItem = ({ item, onRemove }: any) => {
    return (
      <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center w-full md:w-1/2">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-500">${item.price}</p>
          </div>
        </div>

        {/* Appears on medium > */}
        <div className="hidden md:flex items-center mt-4 md:mt-0">
          <div className="border border-gray-600 rounded-lg">
            <button
              onClick={() => onDecrease(item.id)}
              className="text-gray-600 h-[20px] font-bold px-1 py-1 m-1 rounded inline-flex items-center"
            >
              -
            </button>
            <input
              type="text"
              value={0}
              onChange={(e) => onQuantityChange(item.id, e.target.value)}
              className="w-12 text-center"
            />
            <button
              onClick={() => onIncrease(item.id)}
              className=" text-gray-600 h-[20px] font-bold px-1 py-1 m-1 rounded inline-flex items-center"
            >
              +
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center mt-4 md:mt-0 font-semibold">
          ${item.price}
        </div>

        <button
          onClick={() => onRemove(item.id)}
          className="hidden md:flex items-center mt-4 md:mt-0 text-red-500 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>

        {/* Hidden on medium screen > */}
        <div className="md:hidden flex justify-between">
          <div className="flex items-center mt-4 md:mt-0">
            <div className="border border-gray-600 rounded-lg">
              <button
                onClick={() => onDecrease(item.id)}
                className="text-gray-600 h-[20px] font-bold px-1 py-1 m-1 rounded inline-flex items-center"
              >
                -
              </button>
              <input
                type="text"
                value={0}
                onChange={(e) => onQuantityChange(item.id, e.target.value)}
                className="w-12 text-center"
              />
              <button
                onClick={() => onIncrease(item.id)}
                className=" text-gray-600 h-[20px] font-bold px-1 py-1 m-1 rounded inline-flex items-center"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center mt-4 md:mt-0 font-semibold">
            ${item.price}
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="flex items-center mt-4 md:mt-0 text-red-500 hover:text-red-700"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <div className="grid lg:grid-cols-12 sm:grid-cols-6 gap-8">
        <div className="lg:col-span-8 sm:col-span-6">
          <div className="hidden md:flex items-center justify-between p-4 border-b font-bold">
            <div className="w-1/2">Items</div>
            <div className="">Quantity</div>
            <div className="">Subtotal</div>
            <div className="">Remove</div>
          </div>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem key={item.id} item={item} onRemove={handleRemove} />
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
