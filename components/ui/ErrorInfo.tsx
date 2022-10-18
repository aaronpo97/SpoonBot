import { FC } from 'react';

const ErrorInfo: FC<{ message: string }> = ({ message }) => {
  return (
    <div className="w-10/12 rounded-2xl bg-error py-12 px-8 shadow-lg">
      <div>
        <div>
          <h1 className="mb-1 text-5xl font-extrabold text-error-content">Error</h1>
          <p className="text-lg text-error-content">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorInfo;
