import React, { FC } from 'react';

const FormInfo: FC<{
  label: string;
  error: string | undefined;
  labelFor: string;
}> = ({ label, labelFor, error }) => (
  <div className="flex content-between justify-between">
    <label htmlFor={labelFor} className="items-start font-bold uppercase my-1">
      {label}
    </label>
    <span className="items-end my-1">{error}</span>
  </div>
);

export default FormInfo;
