import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  UserCircleIcon,
  DoorClosed,
  Package,
  Store,
  Contact
} from 'lucide-react';

// Define the menu items as an array of objects
const menuItems = [
  {
    name: 'Personal Information',
    path: '/',
    icon: <Contact size={22} />
  },
  { name: 'Products', path: '/', icon: <Store size={22} /> },
  { name: 'My Orders', path: '/', icon: <Package size={22} /> },
  { name: 'Logout', path: '/', icon: <DoorClosed size={22} /> }
];

// Define the Sidebar component
const AccountSidebar = () => {
  // Return the JSX for the sidebar
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center">
            <UserCircleIcon className="bg-white" size={41} />

            <div className="ml-2">
              <h6 className="text-[15px] font-bold">John Doe</h6>
              <p className="text-[13px] text-gray-400">testing@gmail.com</p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent>
        <ul>
          {menuItems.map((item) => (
            <li className="mt-4 hover:text-gray-500 cursor-pointer">
              <div className="flex items-center">
                {item.icon}

                <div className="ml-2">
                  <p className="text-[14px] font-semibold">{item.name}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

// Export the Sidebar component
export default AccountSidebar;
