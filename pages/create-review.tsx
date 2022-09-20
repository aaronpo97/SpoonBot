import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import Link from 'next/link';

import { ReviewResult } from '../util/ResultType';

import ErrorInfo from '../components/ui/ErrorInfo';

import CreateReviewForm from '../components/createReview/CreateReviewForm';
import ReviewResultInfo from '../components/createReview/ReviewResultInfo';
import Spinner from '../components/ui/Spinner';

const CreateReview: NextPage = () => {
  const [result, setResult] = useState<ReviewResult | undefined>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Head>
        <title>SpoonBot: Create a Review</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex w-full flex-col lg:flex-row flex-auto h-full">
        <div className="bg-base-300 lg:w-6/12 w-full lg:h-full h-screen flex flex-col items-center justify-center">
          <h1 className="mt-12 mb-6 font-bold text-4xl">Create a Review</h1>

          <div className="w-10/12">
            <CreateReviewForm
              setResult={setResult}
              setError={setError}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
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
        <div className="lg:w-6/12 bg-base-200 w-full py-10 h-full flex flex-col items-center justify-center">
          {isLoading && <Spinner />}
          {result && <ReviewResultInfo result={result} />}
          {!result && !isLoading && !error && (
            <p className="lg:text-3xl text-base-content font-bold">
              Create a restaurant review using the form!
            </p>
          )}
          {error && <ErrorInfo message={error} />}
        </div>
      </div>
    </>
  );
};

export default CreateReview;
