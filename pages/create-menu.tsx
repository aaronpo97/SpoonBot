import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import ErrorInfo from '../components/ui/ErrorInfo';
import Spinner from '../components/ui/Spinner';
import MenuResultInfo from '../components/createMenu/MenuResultInfo';
import CreateMenuForm from '../components/createMenu/CreateMenuForm';
import Acknowledgment from '../components/Acknowledgment';
import { MenuResult } from '../util/ResultType';

import {
  CreatePageContainer,
  CreatePageLeft,
  CreatePageRight,
} from '../components/ui/CreatePageContainer';

const CreateMenu: NextPage = () => {
  const [result, setResult] = useState<MenuResult | undefined>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Head>
        <title>SpoonBot: Create a Menu</title>
        <meta
          name="description"
          content="Create a menu for your restaurant using SpoonBot."
        />
      </Head>
      <CreatePageContainer>
        <CreatePageLeft>
          <h1 className="mt-12 mb-6 font-bold text-4xl">Create a Menu</h1>
          <div className="w-10/12">
            <CreateMenuForm
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setError={setError}
              setResult={setResult}
            />
          </div>
          <Acknowledgment />
        </CreatePageLeft>
        <CreatePageRight>
          {!(error || result) ? (
            <div className="h-44 flex justify-center items-center">
              {isLoading ? (
                <Spinner />
              ) : (
                <p className="lg:text-3xl md:text-xl text-base-content text-center font-bold mx-7">
                  Create a restaurant menu using the form!
                </p>
              )}
            </div>
          ) : (
            <>
              {error && <ErrorInfo message={error} />}
              {result && <MenuResultInfo result={result} />}
            </>
          )}
        </CreatePageRight>
      </CreatePageContainer>
    </>
  );
};

export default CreateMenu;

export const getServerSideProps = withPageAuthRequired();
