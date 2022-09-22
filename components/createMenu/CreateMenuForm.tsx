import React, { FC, Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

import { MenuResult, ReviewResult } from '../../util/ResultType';
import { APIErrorResponseSchema } from '../../util/APIResponseSchema';

import FormInfo from '../ui/FormInfo';
import FormInput from '../ui/FormInput';
import sendReviewGenRequest from '../../util/client-api-requests/sendReviewGenRequest';
import profanity from '../../config/badwords/profanity';
import generateReviewKeywords from '../../util/examples/generateReviewKeywords';
import sendMenuGenRequest from '../../util/client-api-requests/sendMenuGenRequest';

interface FormComponentProps {
  setResult: Dispatch<SetStateAction<MenuResult | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setError: Dispatch<SetStateAction<string>>;
}

interface FormProps {
  name: string;
  cuisine: string;
}

const CreateReviewForm: FC<FormComponentProps> = ({
  setResult,
  isLoading,
  setIsLoading,
  setError,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = async ({ name, cuisine }) => {
    try {
      setError('');
      setResult(undefined);
      setIsLoading(true);

      const data = await sendMenuGenRequest({ name, cuisine });

      const incomingResult = {
        input: { name, cuisine },
        menu: data.result,
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

  const nameInputRegister = register('name', {
    required: 'Name is required.',
    maxLength: { message: 'Length must be less than 40 characters.', value: 40 },
    validate: (cuisineInput) => {
      const isProfane = profanity.exists(cuisineInput);
      if (isProfane) {
        return 'Your response contains profanity and will not be accepted. Try something else.';
      }
      return true;
    },
  });

  const cuisineInputRegister = register('cuisine', {
    required: 'Cuisine is required.',
    maxLength: {
      message: 'Length must be less than 40 characters.',
      value: 40,
    },
    validate: (cuisineInput) => {
      const isProfane = profanity.exists(cuisineInput);
      if (isProfane) {
        return 'Your response contains profanity and will not be accepted. Try something else.';
      }
      return true;
    },
  });

  const useExample = () => {
    const example = { name: 'The Best Restaurant', cuisine: 'Italian' };
    setValue('name', example.name);
    setValue('cuisine', example.cuisine);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <div className="my-1">
          <FormInfo label="name" labelFor="name-input" error={errors.name?.message} />
          <FormInput
            isError={!!errors.name?.message}
            formRegister={nameInputRegister}
            id="cuisine-input"
            placeholder="Restaurant name goes here"
          />
        </div>

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
            placeholder="Cuisine goes here"
          />
        </div>

        <div className="flex flex-row justify-between">
          <div className="w-1/2 pr-1">
            <button
              type="button"
              className="btn btn-primary rounded-2xl mt-5 lg:text-xl text-lg font-bold w-full"
              disabled={isLoading}
              onClick={useExample}
            >
              Use Example
            </button>
          </div>
          <div className="w-1/2  pl-1">
            <button
              type="button"
              className="btn btn-primary rounded-2xl mt-5 lg:text-xl text-lg font-bold w-full"
              disabled={isLoading}
              onClick={() => {
                reset();
              }}
            >
              Clear
            </button>
          </div>
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
export default CreateReviewForm;
