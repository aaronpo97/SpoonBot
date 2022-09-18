import React, { FC, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import Link from 'next/link';
import Form from '../components/Form';
import { ResultI } from '../util/ResultI';
import Spinner from '../components/Spinner';

const ResultInfo: FC<{ result: ResultI }> = ({ result }) => {
  return (
    <div className="bg-primary shadow-lg rounded-2xl w-10/12 py-12 px-8">
      <p className="text-xl mb-3 italic text-primary-content">The SpoonBot AI said:</p>
      <p className="font-extrabold text-4xl lg:text-5xl text-primary-content">
        {result.name}
      </p>
    </div>
  );
};

const ErrorInfo: FC<{ message: string }> = ({ message }) => {
  return (
    <div className="bg-error shadow-lg w-10/12 rounded-2xl py-12 px-8">
      <div>
        <div>
          <h1 className="text-4xl text-error-content mb-1 font-bold">Error</h1>
          <p className="text-error-content text-lg">{message}</p>
        </div>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const [result, setResult] = useState<ResultI | undefined>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Head>
        <title>SpoonBot: The Restaurant Name Generator</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex w-full flex-col lg:flex-row flex-auto h-full">
        <div className="bg-base-300 lg:w-5/12 w-full lg:h-full flex flex-col items-center justify-center">
          <h1 className="mt-12 mb-6 font-bold text-2xl">Create a Name</h1>
          <div className="w-10/12">
            <Form
              setResult={setResult}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              setError={setError}
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
        <div className="lg:w-7/12 bg-base-200 w-full h-96 lg:h-full flex flex-col items-center justify-center">
          {isLoading && <Spinner />}
          {result && <ResultInfo result={result} />}
          {!result && !isLoading && !error && (
            <p className="lg:text-2xl text-base-content">
              Create a restaurant name using the form!
            </p>
          )}
          {error && <ErrorInfo message={error} />}
        </div>
      </div>
    </>
  );
};

export default Home;
