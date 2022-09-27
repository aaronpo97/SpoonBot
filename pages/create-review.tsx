import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { ReviewResult } from '../util/ResultType';

import ErrorInfo from '../components/ui/ErrorInfo';

import CreateReviewForm from '../components/createReview/CreateReviewForm';
import ReviewResultInfo from '../components/createReview/ReviewResultInfo';
import Spinner from '../components/ui/Spinner';
import Acknowledgment from '../components/Acknowledgment';
import {
  CreatePageContainer,
  CreatePageLeft,
  CreatePageRight,
} from '../components/ui/CreatePageContainer';

const CreateReview: NextPage = () => {
  const [result, setResult] = useState<ReviewResult | undefined>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Head>
        <title>SpoonBot: Create a Review</title>
        <meta
          name="description"
          content="Create a review for your restaurant using SpoonBot."
        />
      </Head>
      <CreatePageContainer>
        <CreatePageLeft>
          <h1 className="mt-12 mb-6 font-bold text-4xl">Create a Review</h1>

          <div className="w-10/12">
            <CreateReviewForm
              setResult={setResult}
              setError={setError}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
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
                  Create a restaurant review using the form!
                </p>
              )}
            </div>
          ) : (
            <>
              {error && <ErrorInfo message={error} />}
              {result && <ReviewResultInfo result={result} />}
            </>
          )}
        </CreatePageRight>
      </CreatePageContainer>
    </>
  );
};

export default CreateReview;
export const getServerSideProps = withPageAuthRequired();
