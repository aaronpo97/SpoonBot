import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import Link from 'next/link';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import ErrorInfo from '../components/ui/ErrorInfo';

import { MenuResult } from '../util/ResultType';
import Spinner from '../components/ui/Spinner';

import MenuResultInfo from '../components/createMenu/MenuResultInfo';
import CreateMenuForm from '../components/createMenu/CreateMenuForm';

const CreateMenu: NextPage = () => {
  const [result, setResult] = useState<MenuResult | undefined>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Head>
        <title>SpoonBot: Create a Menu</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex w-full flex-col lg:flex-row flex-auto h-full">
        <div className="bg-base-300 lg:w-6/12 w-full lg:h-full h-screen flex flex-col items-center justify-center">
          <h1 className="mt-12 mb-6 font-bold text-4xl">Create a Menu</h1>
          <div className="w-10/12">
            <CreateMenuForm
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setError={setError}
              setResult={setResult}
            />
          </div>
          <div className="mt-12 mb-12 container mx-auto flex flex-col items-center justify-center text-base-content font-semibold">
            <p>
              Powered by{' '}
              <Link href="https://openai.com/api/">
                <span className="hover:underline">GPT-3</span>
              </Link>
            </p>
            <p>
              Created by{' '}
              <Link href="https://github.com/aaronpo97/SpoonBot">
                <span className="hover:underline">Aaron William Po</span>
              </Link>
            </p>
          </div>
        </div>
        <div className="lg:w-6/12 bg-base-200 w-full py-12 h-full flex flex-col items-center justify-center">
          {isLoading && <Spinner />}
          {result && <MenuResultInfo result={result} />}
          {!result && !isLoading && !error && (
            <p className="lg:text-3xl md:text-xl text-base-content text-center font-bold mx-7">
              Create a restaurant name using the form!
            </p>
          )}
          {error && <ErrorInfo message={error} />}
        </div>
      </div>
    </>
  );
};

export default CreateMenu;

export const getServerSideProps = withPageAuthRequired();
