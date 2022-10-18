import { FC } from 'react';
import { NameResult } from '../../util/ResultType';

const NameResultInfo: FC<{ result: NameResult }> = ({ result }) => {
  return (
    <div className="w-10/12 select-none rounded-2xl bg-primary py-12 px-8 shadow-lg animate-in fade-in">
      <p className="mb-3 text-xl italic text-primary-content">The SpoonBot AI said:</p>
      <p className="hyphen w-full break-words text-4xl font-extrabold text-primary-content lg:text-5xl">
        {result.name}
      </p>
    </div>
  );
};

export default NameResultInfo;
