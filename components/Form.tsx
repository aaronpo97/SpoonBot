import React, { FC, Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import sendServerRequest from '../util/sendServerRequest';
import FormInput from './FormInput';
import FormInfo from './FormInfo';
import { ResultI } from '../util/ResultI';
import { APIErrorResponseSchema } from '../util/Response';

interface FormComponentProps {
  setResult: Dispatch<SetStateAction<ResultI | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setError: Dispatch<SetStateAction<string>>;
}

interface FormProps {
  cuisine: string;
  keywords: string;
  location: string;
}

const Form: FC<FormComponentProps> = ({
  setResult,
  isLoading,
  setIsLoading,
  setError,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = async ({ cuisine, keywords, location }) => {
    try {
      setError('');
      setResult(undefined);
      setIsLoading(true);

      const data = await sendServerRequest({
        cuisine,
        keywords: keywords.split(','),
        location,
      });

      const incomingResult = {
        name: data.result,
        input: { cuisine, keywords: keywords.split(',') },
      };
      setResult(incomingResult);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        const validateResponseData = APIErrorResponseSchema.safeParse(
          error.response?.data,
        );

        if (!validateResponseData.success) {
          return;
        }

        setError(validateResponseData.data.message);

        setIsLoading(false);
        setResult(undefined);
        return;
      }

      setError('Something went wrong.');
    }
  };

  const badWords = ['w8gh9z72f7uw'];

  const cuisineInputRegister = register('cuisine', {
    required: 'Cuisine type is required.',
    maxLength: { message: 'Length must be less than 20 characters.', value: 20 },
    validate: (cuisineInput) => {
      return !badWords.includes(cuisineInput) || 'You used a banned word.';
    },
  });

  const keywordsInputRegister = register('keywords', {
    required: 'Keywords are required.',
    validate: (keywords) => {
      return (
        keywords.trim().split(/\s+/).length > 1 ||
        'You must include more than one keyword.'
      );
    },
  });

  const locationInputRegister = register('location', {
    required: 'Location is required.',
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
            isError={!!errors.cuisine?.message}
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
            isError={!!errors.keywords?.message}
            formRegister={keywordsInputRegister}
            id="keyword-input"
            placeholder="Burgers, fries, milkshakes, diner"
          />
        </div>
        <div className="my-1">
          <FormInfo
            label="location"
            labelFor="location-input"
            error={errors.location?.message}
          />
          <FormInput
            isError={!!errors.location?.message}
            formRegister={locationInputRegister}
            id="location-input"
            placeholder="Chicago"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary rounded-2xl mt-5 text-xl font-bold"
          disabled={isLoading}
        >
          Generate
        </button>
      </div>
    </form>
  );
};
export default Form;
