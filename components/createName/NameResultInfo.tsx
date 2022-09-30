import { FC } from 'react';
import { NameResult } from '../../util/ResultType';

const NameResultInfo: FC<{ result: NameResult }> = ({ result }) => {
  return (
    <div className="bg-primary shadow-lg rounded-2xl w-10/12 py-12 px-8">
      <p className="text-xl mb-3 italic text-primary-content">The SpoonBot AI said:</p>
      <p className="font-extrabold text-4xl lg:text-5xl text-primary-content hyphen w-full break-words">
        {result.name}
      </p>
    </div>
  );
};

export default NameResultInfo;
