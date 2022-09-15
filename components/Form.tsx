import React, { FC, Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import sendServerRequest from '../util/sendServerRequest';
import FormInput from './FormInput';
import FormInfo from './FormInfo';
import { ResultI } from '../util/ResultI';

const Form: FC<{
  result: ResultI | undefined;
  setResult: Dispatch<SetStateAction<ResultI | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}> = ({ result, setResult, setIsLoading }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ cuisine: string; keywords: string }>();

  const onSubmit: SubmitHandler<{ cuisine: string; keywords: string }> = ({
    cuisine,
    keywords,
  }) => {
    setResult(undefined);
    setIsLoading(true);
    sendServerRequest({ cuisine, keywords: keywords.split(',') })
      .then((data) => {
        const incomingResult = {
          name: data.result,
          input: { cuisine, keywords: keywords.split(',') },
        };
        setResult(incomingResult);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("You're making too many requests.");
        setIsLoading(false);
        setResult(undefined);
      });
  };

  const badWords = ['w8gh9z72f7uw'];

  const cuisineInputRegister = register('cuisine', {
    required: 'Cuisine type is required.',
    maxLength: 20,
    validate: (cuisineInput) => {
      return !badWords.includes(cuisineInput) || 'You used a banned word.';
    },
  });

  const keywordsInputRegister = register('keywords', {
    required: 'Keywords are required.',
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <div className="my-1">
          <FormInfo
            label="cuisine"
            labelFor="cuisine-input"
            error={errors.cuisine?.message}
          />
          <FormInput
            formRegister={cuisineInputRegister}
            id="cuisine-input"
            placeholder="American"
          />
        </div>
        <div className="my-1">
          <FormInfo
            label="keywords"
            labelFor="keyword-input"
            error={errors.keywords?.message}
          />
          <FormInput
            formRegister={keywordsInputRegister}
            id="cuisine-input"
            placeholder="Burgers, fries, milkshakes, diner"
          />
        </div>

        <button type="submit" className="btn mt-5">
          Generate
        </button>
      </div>
    </form>
  );
};
export default Form;
