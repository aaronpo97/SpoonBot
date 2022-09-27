import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import React, { FC, Dispatch, SetStateAction } from 'react';

import { APIErrorResponseSchema } from '../../util/APIResponseSchema';
import { MenuResult } from '../../util/ResultType';
import FormInfo from '../ui/FormInfo';
import FormInput from '../ui/FormInput';
import profanity from '../../config/badwords/profanity';
import sendMenuGenRequest from '../../util/client-api-requests/sendMenuGenRequest';
import { cuisineAndKeywords } from '../../util/examples/data';
import { SmallButton, SubmitButton } from '../ui/FormButtons';

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

const CreateMenuForm: FC<FormComponentProps> = ({
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
    const { cuisine: randomCuisine } =
      cuisineAndKeywords[Math.floor(Math.random() * cuisineAndKeywords.length)];

    const example = { name: 'Insert name here', cuisine: randomCuisine };
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
        <div className="flex flex-row justify-between mt-5">
          <div className="w-1/2 mr-1">
            <SmallButton disabled={isLoading} onClick={useExample}>
              Use Example
            </SmallButton>
          </div>
          <div className="w-1/2 ml-1">
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
export default CreateMenuForm;
