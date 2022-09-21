import React from 'react';
import type { NextPage } from 'next';

const Page404: NextPage = () => {
  return (
    <div className="flex items-center flex-col justify-center h-full bg-primary">
      <h1 className="font-bold text-4xl text-primary-content">404 Not Found</h1>
      <p className="text-primary-content">That page cannot be found.</p>
    </div>
  );
};

export default Page404;
