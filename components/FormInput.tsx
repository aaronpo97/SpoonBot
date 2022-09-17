import React, { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const FormInput: FC<{
  formRegister: UseFormRegisterReturn<string>;
  id: string;
  // eslint-disable-next-line react/require-default-props
  isError?: boolean;
  // eslint-disable-next-line react/require-default-props
  placeholder?: string;
}> = ({ formRegister, id, placeholder, isError = false }) => {
  return (
    <input
      id={id}
      type="text"
      {...formRegister}
      className={`input rounded-none w-full ${isError ? 'input-error' : ''}`}
      autoComplete="off"
      placeholder={placeholder}
    />
  );
};

export default FormInput;
