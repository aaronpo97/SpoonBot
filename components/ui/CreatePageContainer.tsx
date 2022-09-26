import { FC, ReactNode } from 'react';

export const CreatePageContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex w-full flex-col lg:flex-row flex-auto h-full">{children}</div>
  );
};

export const CreatePageLeft: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="bg-base-300 lg:w-6/12 w-full lg:h-full h-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export const CreatePageRight: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="lg:w-6/12 bg-base-200 w-full h-96 lg:h-full flex flex-col items-center justify-center">
      {children}
    </div>
  );
};
