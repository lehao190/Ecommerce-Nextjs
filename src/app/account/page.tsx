import AccountSidebar from '@/components/customs/sidebars/AccountSidebar';
import React from 'react';

type Props = {};

const MyAccount = (props: Props) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-10">My Profile</h1>

      <div className="flex">
        <AccountSidebar />

        {/* Main content */}
        <div className="">
          {/* Put your main content here */}
          Main Content
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
