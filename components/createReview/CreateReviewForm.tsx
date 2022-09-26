import React, { FC, Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

import { ReviewResult } from '../../util/ResultType';
import { APIErrorResponseSchema } from '../../util/APIResponseSchema';

import FormInfo from '../ui/FormInfo';
import FormInput from '../ui/FormInput';
import sendReviewGenRequest from '../../util/client-api-requests/sendReviewGenRequest';
import profanity from '../../config/badwords/profanity';
import generateReviewKeywords from '../../util/examples/generateReviewKeywords';

interface FormComponentProps {
  setResult: Dispatch<SetStateAction<ReviewResult | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setError: Dispatch<SetStateAction<string>>;
}

interface FormProps {
  name: string;
  keywords: string;
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

  const onSubmit: SubmitHandler<FormProps> = async ({ name, keywords }) => {
    try {
      setError('');
      setResult(undefined);
      setIsLoading(true);

      const data = await sendReviewGenRequest({
        name,
        keywords: keywords.split(','),
      });

      const incomingResult = {
        review: data.result,
        input: { name, keywords: keywords.split(',') },
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

  const keywordsInputRegister = register('keywords', {
    required: 'Keywords are required.',
    validate: (keywords) => {
      const keywordsArray = keywords.split(',');

      const isProfane = keywordsArray.some((keyword) => profanity.exists(keyword));
      const isTooLong = keywordsArray.some((keyword) => keyword.length > 25);
      const isUpTo10Keywords = keywordsArray.length > 10;
      const hasMoreThanTwoKeyWords = keywordsArray.length < 2;

      if (hasMoreThanTwoKeyWords) {
        return 'You must have at least two keywords.';
      }
      if (isProfane) {
        return 'Your response contains profanity and will not be accepted. Try something else.';
      }
      if (isTooLong) {
        return 'Keywords must be less than 25 characters.';
      }
      if (isUpTo10Keywords) {
        return 'You can only enter up to 10 keywords.';
      }
      return true;
    },
  });

  const useExample = () => {
    setValue('name', `Aaron's Bar and Grill`);
    setValue('keywords', generateReviewKeywords());
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
            label="keywords/phrases (separated by commas)"
            labelFor="keyword-input"
            error={errors.keywords?.message}
          />
          <FormInput
            isError={!!errors.keywords?.message}
            formRegister={keywordsInputRegister}
            id="keyword-input"
            placeholder="Describe the restaurant in a few words/phrases"
          />
        </div>

        <div className="flex flex-row justify-between">
          <div className="w-1/2 pr-1">
            <button
              type="button"
              className="btn btn-primary btn-sm rounded-2xl mt-5 lg:text-xl text-md font-bold w-full"
              disabled={isLoading}
              onClick={useExample}
            >
              Use Example
            </button>
          </div>
          <div className="w-1/2  pl-1">
            <button
              type="button"
              className="btn btn-primary btn-sm rounded-2xl mt-5 lg:text-xl text-md font-bold w-full"
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
          className="btn btn-primary rounded-2xl mt-5 text-xl font-bold  w-full"
          disabled={isLoading}
        >
          Generate
        </button>
      </div>
    </form>
  );
};
export default CreateReviewForm;
