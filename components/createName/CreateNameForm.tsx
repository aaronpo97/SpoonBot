import React, { FC, Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import sendNameGenRequest from '../../util/client-api-requests/sendNameGenRequest';

import { APIErrorResponseSchema } from '../../util/APIResponseSchema';
import { NameResult } from '../../util/ResultType';
import FormInfo from '../ui/FormInfo';
import FormInput from '../ui/FormInput';
import filter from '../../config/badwords/filter';

interface FormComponentProps {
  setResult: Dispatch<SetStateAction<NameResult | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setError: Dispatch<SetStateAction<string>>;
}

interface FormProps {
  cuisine: string;
  keywords: string;
  location: string;
}

const CreateNameForm: FC<FormComponentProps> = ({
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

      const data = await sendNameGenRequest({
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

  const cuisineInputRegister = register('cuisine', {
    required: 'Cuisine type is required.',
    maxLength: { message: 'Length must be less than 20 characters.', value: 20 },
    validate: (cuisineInput) => {
      return (
        !filter.isProfane(cuisineInput) ||
        'Your response contains profanity and will not be accepted. Try something else.'
      );
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

      // check if any of the keywords are longer than 15 characters
      const isTooLong = keywordsArray.some((keyword) => keyword.length > 15);

      if (isTooLong) {
        return 'Keywords must be less than 15 characters.';
      }

      if (keywordsArrayLength > 5) {
        return 'You can only enter up to 5 keywords.';
      }
      return true;
    },
  });

  const locationInputRegister = register('location', {
    required: 'Location is required.',
    maxLength: { message: 'Length must be less than 20 characters.', value: 20 },
    validate: (locationInput) => {
      return (
        !filter.isProfane(locationInput) ||
        'Your response contains profanity and will not be accepted. Try something else.'
      );
    },
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
export default CreateNameForm;
