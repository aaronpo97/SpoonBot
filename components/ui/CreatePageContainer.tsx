import { FC, ReactNode } from 'react';

export const CreatePageContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex w-full flex-auto flex-col lg:h-full lg:flex-row">{children}</div>
  );
};

export const CreatePageLeft: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-base-300 py-2 lg:h-full lg:w-6/12">
      {children}
    </div>
  );
};

export const CreatePageRight: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-base-200 py-8 lg:h-full lg:w-6/12">
      {children}
    </div>
  );
};
