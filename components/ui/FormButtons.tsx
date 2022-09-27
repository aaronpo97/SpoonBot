import { FC } from 'react';

interface FormButtonProps {
  children: string;
  disabled: boolean;
}
interface SmallButtonProps extends FormButtonProps {
  onClick: () => void;
}

export const SmallButton: FC<SmallButtonProps> = ({ children, disabled, onClick }) => {
  return (
    <button
      type="button"
      className="btn btn-primary btn-sm mt-5 lg:text-xl text-md font-bold w-full"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const SubmitButton: FC<FormButtonProps> = ({ children, disabled }) => {
  return (
    <button
      type="submit"
      className="btn btn-primary mt-5 text-xl font-bold  w-full"
      disabled={disabled}
    >
      {children}
    </button>
  );
};
