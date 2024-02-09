'use client';

import { Separator } from '@/components/ui/separator';
import CartItem from '@/components/customs/cart/CartItem';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';

// The main component for the cart page
const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  // A function for calculating the total price of the items in the cart
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <div className="grid lg:grid-cols-12 sm:grid-cols-6 gap-8">
        <div className="lg:col-span-8 sm:col-span-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
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
