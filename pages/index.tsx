import React, { FC, useState } from 'react';
import type { NextPage } from 'next';

import Form from '../components/Form';
import { ResultI } from '../util/ResultI';
import Spinner from '../components/Spinner';

const ResultInfo: FC<{ result: ResultI }> = ({ result }) => {
  return (
    <div>
      <p className="font-extrabold text-5xl italic">{result.name}</p>
    </div>
  );
};

const Home: NextPage = () => {
  const [result, setResult] = useState<ResultI | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex w-full h-screen flex-col lg:flex-row">
      <div className="bg-base-300 lg:w-5/12 lg:h-screen h-[60%] w-full flex flex-col items-center justify-center">
        <h1 className="font-bold lg:text-4xl text-xl mb-4">
          The Restaurant Name Generator
        </h1>
        <div className="w-10/12">
          <Form result={result} setResult={setResult} setIsLoading={setIsLoading} />
        </div>
      </div>
      <div className="lg:w-7/12 bg-base-200 w-full lg:h-screen h-[40%] flex flex-col items-center justify-center">
        {isLoading && <Spinner />}
        {result && <ResultInfo result={result} />}
      </div>
    </div>
  );
};

export default Home;
