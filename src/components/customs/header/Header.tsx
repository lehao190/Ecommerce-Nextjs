'use client';

import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import HeaderSheet from './HeaderSheet';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';

const navigations = [
  {
    text: 'Home',
    link: '/'
  },
  {
    text: 'Shop',
    link: '/shop'
  },
  {
    text: 'My Account',
    link: '/account'
  },
  {
    text: 'Login',
    link: '/login'
  },
  {
    text: 'Sign Up',
    link: '/register'
  }
];

function Header() {
  const cartItemsCount = useSelector(
    (state: RootState) => state.cart.cartItems.length
  );

  return (
    <div className="flex items-center justify-between p-4">
      <div className="text-primary text-2xl font-bold">
        <Link href="/">Ecommerce</Link>
      </div>

      <div className="flex space-x-3">
        {navigations.map((navigation, index) => (
          <Link
            href={navigation.link}
            key={index}
            className={`text-gray-500 bg-inherit text-sm py-2 px-4 rounded-md ${
              navigation.text === 'Sign Up'
                ? 'bg-primary hover:bg-pink-500 text-white'
                : null
            } hidden md:block lg:block`}
          >
            {navigation.text}
          </Link>
        ))}

        <Link href={'/cart'} className="py-2 px-4 bg-inherit relative">
          <ShoppingBag className="text-gray-500" size={26} />
          {cartItemsCount > 0 && (
            <span className="absolute top-0 right-0 text-[10px] bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </Link>

        <HeaderSheet navigations={navigations} />
      </div>
    </div>
  );
}

export default Header;
