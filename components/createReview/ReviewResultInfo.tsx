import { FC } from 'react';
import { ReviewResult } from '../../util/ResultType';

const ReviewResultInfo: FC<{ result: ReviewResult }> = ({ result }) => {
  return (
    <div className="bg-primary shadow-lg rounded-2xl w-10/12 py-12 px-8 animate-in fade-in select-none">
      <p className="text-xl font-bold mb-3 italic text-primary-content">
        The SpoonBot AI wrote a review:
      </p>
      <p className="text-xl text-primary-content">{result.review}</p>
    </div>
  );
};

export default ReviewResultInfo;
