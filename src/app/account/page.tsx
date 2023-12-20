import CreateProduct from '@/components/customs/account/product/CreateProduct';
import AccountSidebar from '@/components/customs/sidebars/AccountSidebar';
import React from 'react';

type Props = {};

const MyAccount = (props: Props) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-10">My Profile</h1>

      <div className="flex gap-8">
        <AccountSidebar />

        {/* Main content */}
        <div className="grow max-w-[650px]">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
