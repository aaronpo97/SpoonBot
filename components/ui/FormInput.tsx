import React, { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const FormInput: FC<{
  formRegister: UseFormRegisterReturn<string>;
  id: string;
  isError: boolean;
  placeholder: string;
  isSubmitting: boolean;
}> = ({ formRegister, id, placeholder, isError, isSubmitting }) => {
  return (
    <input
      id={id}
      type="text"
      disabled={isSubmitting}
      {...formRegister}
      className={`input w-full  rounded-xl text-[16px] ${isError ? 'input-error' : ''}`}
      autoComplete="off"
      placeholder={placeholder}
    />
  );
};

export default FormInput;
