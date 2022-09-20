// create a text area component using daisyui

import React, { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextAreaProps {
  formRegister: UseFormRegisterReturn<string>;
  id: string;
  // eslint-disable-next-line react/require-default-props
  isError?: boolean;
  // eslint-disable-next-line react/require-default-props
  placeholder?: string;
}

const TextArea: FC<TextAreaProps> = ({
  formRegister,
  id,
  placeholder,
  isError = false,
}) => {
  return (
    <textarea
      id={id}
      {...formRegister}
      placeholder={placeholder}
      rows={6}
      className={`w-full textarea rounded-xl  text-[16px] resize-none ${
        isError ? 'input-error' : ''
      }`}
    />
  );
};

export default TextArea;
