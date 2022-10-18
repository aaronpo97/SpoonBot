import React, { FC } from 'react';

const FormInfo: FC<{
  label: string;
  error: string | undefined;
  labelFor: string;
}> = ({ label, labelFor, error }) => (
  <div className="flex content-between items-center justify-between">
    <label htmlFor={labelFor} className="text-md my-1 items-start font-bold uppercase">
      {label}
    </label>
    <span className="my-1 items-end text-xs italic lg:text-sm">{error}</span>
  </div>
);

export default FormInfo;
