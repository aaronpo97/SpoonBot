import { useUser } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface Props {}

const Home: NextPage<Props> = () => {
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>SpoonBot: Home</title>
        description
        <meta
          name="description"
          content="Welcome to SpoonBot! The AI powered restaurant name, menu, and review generator."
        />
      </Head>
      <div className="flex h-full flex-col items-center justify-center bg-primary text-primary-content">
        <h1 className="mt-[-12] text-5xl font-bold md:text-8xl">SpoonBot</h1>
        <h2 className="mt-3 text-xl font-semibold md:text-3xl">The Restaurant Bot</h2>
        <div className="mt-10 flex flex-col items-center justify-center">
          {user ? (
            <>
              <h3 className="text-4xl font-semibold">Welcome!</h3>
              <h4 className="mt-1 text-xl font-semibold">You are now logged in.</h4>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-semibold md:text-3xl">Welcome!</h3>
              <h4 className="mt-1 text-sm font-semibold italic md:text-xl">
                Please{' '}
                <Link
                  href="/api/auth/login"
                  aria-details="This is a link to login or create a new account."
                >
                  <span className="cursor-pointer hover:underline">
                    login or create an account
                  </span>
                </Link>{' '}
                to get started.
              </h4>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
