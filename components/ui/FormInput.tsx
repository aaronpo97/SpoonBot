import React, { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const FormInput: FC<{
  formRegister: UseFormRegisterReturn<string>;
  id: string;
  isError: boolean;
  placeholder: string;
}> = ({ formRegister, id, placeholder, isError }) => {
  return (
    <input
      id={id}
      type="text"
      {...formRegister}
      className={`input rounded-xl  text-[16px] w-full ${isError ? 'input-error' : ''}`}
      autoComplete="off"
      placeholder={placeholder}
    />
  );
};

export default FormInput;
