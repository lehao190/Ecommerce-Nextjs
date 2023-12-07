'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Menu } from 'lucide-react';

type Props = {
  navigations: {
    link: string,
    text: string
  }[]
};

const HeaderSheet = ({ navigations }: Props) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-inherit sm:hidden">
          <Menu className="text-gray-500" size={26} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="grid gap-4">
          {navigations.map((navigation, index) => (
            <Link
              href={navigation.link}
              key={index}
              className="text-gray-500 bg-inherit text-sm"
              onClick={() => setOpen(false)}
            >
              {navigation.text}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderSheet;
