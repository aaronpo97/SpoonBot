import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import CreateNameForm from '../components/createName/CreateNameForm';
import ErrorInfo from '../components/ui/ErrorInfo';

import { NameResult } from '../util/ResultType';
import NameResultInfo from '../components/createName/NameResultInfo';
import Spinner from '../components/ui/Spinner';
import Acknowledgment from '../components/Acknowledgment';
import {
  CreatePageContainer,
  CreatePageLeft,
  CreatePageRight,
} from '../components/ui/CreatePageContainer';

const CreateName: NextPage = () => {
  const [result, setResult] = useState<NameResult | undefined>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Head>
        <title>SpoonBot: Create a Name</title>
        <meta
          name="description"
          content="Create a name for your restaurant using SpoonBot."
        />
      </Head>
      <CreatePageContainer>
        <CreatePageLeft>
          <h1 className="mt-12 mb-6 font-bold text-4xl">Create a Name</h1>
          <div className="w-10/12">
            <CreateNameForm
              setResult={setResult}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              setError={setError}
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
                  Create a restaurant name using the form!
                </p>
              )}
            </div>
          ) : (
            <>
              {error && <ErrorInfo message={error} />}
              {result && <NameResultInfo result={result} />}
            </>
          )}
        </CreatePageRight>
      </CreatePageContainer>
    </>
  );
};

export default CreateName;

export const getServerSideProps = withPageAuthRequired();
