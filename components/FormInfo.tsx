import React, { FC } from 'react';

const FormInfo: FC<{
  label: string;
  error: string | undefined;
  labelFor: string;
}> = ({ label, labelFor, error }) => (
  <div className="flex content-between justify-between items-center">
    <label htmlFor={labelFor} className="items-start text-md font-bold uppercase my-1">
      {label}
    </label>
    <span className="items-end my-1 italic text-sm">{error}</span>
  </div>
);

export default FormInfo;
