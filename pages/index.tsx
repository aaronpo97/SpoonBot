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
      <div className="h-full flex flex-col items-center justify-center bg-primary text-primary-content">
        <h1 className="md:text-8xl text-5xl font-bold mt-[-12]">SpoonBot</h1>
        <h2 className="md:text-3xl text-xl mt-3 font-semibold">The Restaurant Bot</h2>
        <div className="mt-10 flex flex-col items-center justify-center">
          {user ? (
            <>
              <h3 className="text-4xl font-semibold">Welcome!</h3>
              <h4 className="text-xl font-semibold mt-1">You are now logged in.</h4>
            </>
          ) : (
            <>
              <h3 className="md:text-3xl text-2xl font-semibold">Welcome!</h3>
              <h4 className="text-sm md:text-xl font-semibold mt-1 italic">
                Please{' '}
                <Link
                  href="/api/auth/login"
                  aria-details="This is a link to login or create a new account."
                >
                  <span className="hover:underline cursor-pointer">
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
