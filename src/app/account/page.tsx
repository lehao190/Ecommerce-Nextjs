'use client';

import CreateProduct from '@/components/customs/account/product/CreateProduct';
import EditUser from '@/components/customs/account/user/EditUser';
import OrderTable from '@/components/customs/account/order/OrderTable';
import AccountSidebar, {
  TAccountTabItem
} from '@/components/customs/sidebars/AccountSidebar';
import React, { useState } from 'react';
import ProductTable from '@/components/customs/account/product/ProductTable';

type TTabComponent = Record<TAccountTabItem, JSX.Element>;

const componentTab: TTabComponent = {
  EDIT_USER: <EditUser />,
  PRODUCTS: <CreateProduct />,
  PRODUCTS_LIST: <ProductTable />,
  ORDERS: <OrderTable />
};

// Render component
const renderTabComponent = (accountTabItem: TAccountTabItem): JSX.Element => {
  return componentTab[accountTabItem];
};

const MyAccount = () => {
  const [currentTab, setCurrentTab] = useState<TAccountTabItem>('EDIT_USER');

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-10">My Profile</h1>

      <div className="md:flex gap-8">
        <div className="grow max-w-[300px] h-[300px]">
          <AccountSidebar setCurrentTab={setCurrentTab} currentTab={currentTab} />
        </div>

        {/* Main content */}
        <div className="md:grow max-w-[650px] mt-8 md:mt-0">
          {renderTabComponent(currentTab)}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
