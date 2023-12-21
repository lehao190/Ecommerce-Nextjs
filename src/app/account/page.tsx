import CreateProduct from '@/components/customs/account/product/CreateProduct';
import EditUser from '@/components/customs/account/user/EditUser';
import AccountSidebar from '@/components/customs/sidebars/AccountSidebar';
import React from 'react';

const MyAccount = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-10">My Profile</h1>

      <div className="md:flex gap-8">
        <div className="grow max-w-[300px] h-[300px]">
          <AccountSidebar />
        </div>
        
        {/* Main content */}
        <div className="md:grow max-w-[650px] mt-8 md:mt-0">
          {/* <CreateProduct /> */}
          <EditUser/>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
