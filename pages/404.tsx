import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

const Page404: NextPage = () => {
  return (
    <>
      <Head>
        <title>SpoonBot: 404 Not Found</title>
        <meta name="description" content="That page doesn't exist." />
      </Head>
      <div className="flex h-full flex-col items-center justify-center bg-primary">
        <h1 className="text-4xl font-bold text-primary-content">404 Not Found</h1>
        <p className="text-primary-content">That page doesn&apos;t exist.</p>
      </div>
    </>
  );
};

export default Page404;
