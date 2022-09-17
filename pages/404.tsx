import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const Page404: NextPage = () => {
  const router = useRouter();

  const [currentPath, setCurrentPath] = useState('');
  useEffect(() => {
    setCurrentPath(router.asPath);
  }, [router.asPath]);

  return (
    <div className="flex items-center justify-center h-full">
      <div>
        <h1 className="font-bold text-4xl">404 Not Found</h1>
        <p>The requested URL {currentPath} was not found on this server.</p>
      </div>
    </div>
  );
};

export default Page404;
