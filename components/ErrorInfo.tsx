import { FC } from 'react';

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

export default ErrorInfo;
