// create a next js page called contact
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { NextPage } from 'next';
import Head from 'next/head';
import FormInput from '../components/ui/FormInput';
import FormInfo from '../components/ui/FormInfo';
import filter from '../config/badwords/filter';
import TextArea from '../components/ui/TextArea';

type FormData = {
  name: string;
  email: string;
  message: string;
};
const ContactForm: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit(async (data) => {
    alert('Not implemented.');
    reset();
  });

  const nameFormRegister = register('name', {
    required: 'Name is required.',
    validate: (name) => {
      const containsProfanity = filter.isProfane(name);
      return !containsProfanity || 'Name is not allowed.';
    },
  });
  const emailFormRegister = register('email', {
    required: 'Email is required.',
    validate: (email) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email) || 'Email is invalid.';
    },
  });
  const messageFormRegister = register('message', {
    required: 'Message is required.',
    validate: (message) => {
      const containsProfanity = filter.isProfane(message);
      return !containsProfanity || 'Message contains profanity.';
    },
  });

  return (
    <form className="form-control w-full" onSubmit={onSubmit}>
      <div className="flex flex-col mt-4">
        <div className="my-1">
          <FormInfo label="name" labelFor="name-input" error={errors.name?.message} />
          <FormInput
            id="name-input"
            formRegister={nameFormRegister}
            placeholder="John Doe"
            isError={!!errors.name?.message}
          />
        </div>
        <div className="my-1">
          <FormInfo label="email" labelFor="email-input" error={errors.email?.message} />
          <FormInput
            id="email-input"
            formRegister={emailFormRegister}
            placeholder="contact@example.com"
            isError={!!errors.email?.message}
          />
        </div>
        <div className="my-1">
          <FormInfo
            label="message"
            labelFor="message-input"
            error={errors.message?.message}
          />
          <TextArea
            id="message-input"
            formRegister={messageFormRegister}
            placeholder="Your message goes here."
            isError={!!errors.message?.message}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary rounded-2xl mt-6 text-xl font-bold"
        >
          Send
        </button>
      </div>
    </form>
  );
};
const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <title>SpoonBot: Contact</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="bg-base-300 h-full flex items-center justify-center flex-col">
        <h1 className="font-bold text-5xl">Contact</h1>
        <div className="lg:w-8/12 w-10/12">
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default Contact;
