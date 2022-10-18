import { FC } from 'react';
import { ReviewResult } from '../../util/ResultType';

const ReviewResultInfo: FC<{ result: ReviewResult }> = ({ result }) => {
  return (
    <div className="w-10/12 select-none rounded-2xl bg-primary py-12 px-8 shadow-lg animate-in fade-in">
      <p className="mb-3 text-xl font-bold italic text-primary-content">
        The SpoonBot AI wrote a review:
      </p>
      <p className="text-xl text-primary-content">{result.review}</p>
    </div>
  );
};

export default ReviewResultInfo;
