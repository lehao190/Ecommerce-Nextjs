import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  UserCircleIcon,
  DoorClosed,
  Package,
  Store,
  Contact
} from 'lucide-react';

export type TAccountTabItem = 'EDIT_USER' | 'PRODUCTS' | 'PRODUCTS_LIST' | 'ORDERS';

const TABS: TAccountTabItem[] = ['EDIT_USER', 'PRODUCTS', 'PRODUCTS_LIST', 'ORDERS'];

const menuItems = [
  {
    name: 'Personal Information',
    tab: TABS[0],
    icon: <Contact size={22} />
  },
  { name: 'Products', tab: TABS[1], icon: <Store size={22} /> },
  { name: 'Product list', tab: TABS[2], icon: <Package size={22} /> },
  { name: 'My Orders', tab: TABS[3], icon: <Package size={22} /> },
  { name: 'Logout', icon: <DoorClosed size={22} /> }
];

// Sidebar props
type Props = {
  setCurrentTab: React.Dispatch<React.SetStateAction<TAccountTabItem>>;
  currentTab: TAccountTabItem;
};

// Define the Sidebar component
const AccountSidebar = ({ setCurrentTab, currentTab }: Props) => {
  return (
    <Card>
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
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => setCurrentTab(item.tab ? item.tab : 'EDIT_USER')}
              className={`mt-4 hover:text-pink-500 cursor-pointer ${currentTab === item.tab ? 'text-primary' : 'text-black'}`}
            >
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

export default AccountSidebar;
