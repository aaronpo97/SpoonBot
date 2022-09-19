import React, { FC, Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

import { ReviewResult } from '../../util/ResultType';
import { APIErrorResponseSchema } from '../../util/APIResponseSchema';

import FormInfo from '../ui/FormInfo';
import FormInput from '../ui/FormInput';
import sendReviewGenRequest from '../../util/client-api-requests/sendReviewGenRequest';
import filter from '../../config/badwords/filter';

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
      if (filter.isProfane(cuisineInput)) {
        return 'Your response contains profanity and will not be accepted. Try something else.';
      }

      return true;
    },
  });

  const keywordsInputRegister = register('keywords', {
    required: 'Keywords are required.',
    validate: (keywords) => {
      const keywordsArray = keywords.split(',');
      const keywordsArrayLength = keywordsArray.length;

      if (keywordsArrayLength < 2) {
        return 'You must enter at least two keywords.';
      }

      const isProfane = keywordsArray.some((keyword) => filter.isProfane(keyword));

      if (isProfane) {
        return 'Your response contains profanity and will not be accepted. Try something else.';
      }

      const isTooLong = keywordsArray.some((keyword) => keyword.length > 25);

      if (isTooLong) {
        return 'Keywords must be less than 25 characters.';
      }

      if (keywordsArrayLength > 10) {
        return 'You can only enter up to 10 keywords.';
      }
      return true;
    },
  });

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
            label="keywords"
            labelFor="keyword-input"
            error={errors.keywords?.message}
          />
          <FormInput
            isError={!!errors.keywords?.message}
            formRegister={keywordsInputRegister}
            id="keyword-input"
            placeholder="Great food, fair prices, good location, located downtown"
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
export default CreateReviewForm;
