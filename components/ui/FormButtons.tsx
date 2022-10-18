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
      className="text-md btn btn-primary btn-sm w-full font-bold lg:text-xl"
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
      className="btn btn-primary w-full text-xl  font-bold"
      disabled={disabled}
    >
      {children}
    </button>
  );
};
