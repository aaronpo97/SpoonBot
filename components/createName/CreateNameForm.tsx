import React, { FC, Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

import { APIErrorResponseSchema } from '../../util/APIResponseSchema';
import { NameResult } from '../../util/ResultType';
import FormInfo from '../ui/FormInfo';
import FormInput from '../ui/FormInput';
import profanity from '../../config/badwords/profanity';
import generateNamePrompt from '../../util/examples/generateNamePrompt';
import { SmallButton, SubmitButton } from '../ui/FormButtons';
import sendNameGenRequest from '../../util/client-api-requests/generate/sendNameGenRequest';

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
    setValue,
    reset,
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
        !profanity.exists(cuisineInput) ||
        'Your response contains profanity and will not be accepted. Try something else.'
      );
    },
  });

  const keywordsInputRegister = register('keywords', {
    required: 'Keywords are required.',
    validate: (keywords) => {
      const keywordsArray = keywords.split(',');
      const keywordsArrayLength = keywordsArray.length;
      const isProfane = keywordsArray.some((keyword) => profanity.exists(keyword));
      const isTooLong = keywordsArray.some((keyword) => keyword.length > 25);

      if (keywordsArrayLength < 2) {
        return 'You must enter at least two keywords.';
      }
      if (isProfane) {
        return 'Your response contains profanity and will not be accepted. Try something else.';
      }
      if (isTooLong) {
        return 'Keywords must be less than 15 characters.';
      }
      if (keywordsArrayLength > 6) {
        return 'You can only enter up to 6 keywords.';
      }
      return true;
    },
  });

  const locationInputRegister = register('location', {
    required: 'Location is required.',
    maxLength: { message: 'Length must be less than 20 characters.', value: 20 },
    validate: (locationInput) => {
      return (
        !profanity.exists(locationInput) ||
        'Your response contains profanity and will not be accepted. Try something else.'
      );
    },
  });

  const useExample = () => {
    const { cuisine, keywords, location } = generateNamePrompt();
    setValue('cuisine', cuisine);
    setValue('keywords', keywords);
    setValue('location', location);
  };

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
            isSubmitting={isLoading}
            isError={!!errors.cuisine?.message}
            formRegister={cuisineInputRegister}
            id="cuisine-input"
            placeholder="Cuisine type"
          />
        </div>
        <div className="my-1">
          <FormInfo
            label="keywords (separated by commas)"
            labelFor="keyword-input"
            error={errors.keywords?.message}
          />
          <FormInput
            isSubmitting={isLoading}
            isError={!!errors.keywords?.message}
            formRegister={keywordsInputRegister}
            id="keyword-input"
            placeholder="Restaurant keywords separated by commas"
          />
        </div>
        <div className="my-1">
          <FormInfo
            label="location"
            labelFor="location-input"
            error={errors.location?.message}
          />
          <FormInput
            isSubmitting={isLoading}
            isError={!!errors.location?.message}
            formRegister={locationInputRegister}
            id="location-input"
            placeholder="Restaurant location"
          />
        </div>

        <div className="mt-5 flex flex-row justify-between">
          <div className="mr-1 w-1/2">
            <SmallButton disabled={isLoading} onClick={useExample}>
              Use Example
            </SmallButton>
          </div>
          <div className="ml-1 w-1/2">
            <SmallButton
              disabled={isLoading}
              onClick={() => {
                reset();
              }}
            >
              Clear
            </SmallButton>
          </div>
        </div>
        <div className="mt-2">
          <SubmitButton disabled={isLoading}>Generate</SubmitButton>
        </div>
      </div>
    </form>
  );
};
export default CreateNameForm;
