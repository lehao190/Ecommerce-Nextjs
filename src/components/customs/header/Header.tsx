import React from 'react';
import { ShoppingBag, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet';

function Header() {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4">
      <div className="text-primary text-2xl font-bold">Ecommerce</div>
      <div className="flex space-x-3">
        <Button className="text-gray-500 bg-inherit text-sm py-2 px-4 hidden md:block lg:block">
          Home
        </Button>
        <Button className="text-gray-500 bg-inherit text-sm py-2 px-4 hidden md:block lg:block">
          Login
        </Button>
        <Button className="text-gray-500 bg-inherit text-sm py-2 px-4 hidden md:block lg:block">
          My Account
        </Button>
        <Button className="bg-primary hover:bg-pink-500 text-sm text-white hidden md:block lg:block">
          Sign up
        </Button>
        <Button className="py-2 px-4 bg-inherit relative">
          <ShoppingBag className="text-gray-500" size={26} />
          <span className="absolute top-0 right-0 text-[10px] bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
            1
          </span>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-inherit sm:hidden">
              <Menu className="text-gray-500" size={26} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="grid gap-4">
              <Button className="text-gray-500 bg-inherit text-sm">
                Home
              </Button>
              <Button className="text-gray-500 bg-inherit text-sm">
                Login
              </Button>
              <Button className="text-gray-500 bg-inherit text-sm">
                My Account
              </Button>
              <Button className="text-gray-500 bg-inherit text-sm">
                Sign up
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Header;
