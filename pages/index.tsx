import { useUser } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface Props {}

const Home: NextPage<Props> = () => {
  const { user } = useUser();
  console.log(user?.sub);
  return (
    <>
      <Head>
        <title>SpoonBot: Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="h-full flex flex-col items-center justify-center bg-primary text-primary-content">
        <h1 className="sm:text-8xl text-5xl font-bold mt-[-12]">SpoonBot</h1>
        <h2 className="sm:text-3xl text-xl mt-3 font-semibold">
          The Restaurant Name and Review Bot
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center">
          {user ? (
            <>
              <h3 className="text-4xl font-semibold">Welcome!</h3>
              <h4 className="text-xl font-semibold mt-1">You are now logged in.</h4>
            </>
          ) : (
            <h3 className="text-xl font-semibold">
              Welcome! Please{' '}
              <Link href="/api/auth/login" className="cursor-pointer">
                <span className="hover:underline">login or create an account</span>
              </Link>{' '}
              to get started.
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
