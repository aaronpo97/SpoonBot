import { NextPage } from 'next';
import Head from 'next/head';

interface Props {}

const Home: NextPage<Props> = () => {
  return (
    <>
      <Head>
        <title>SpoonBot: Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="h-full flex flex-col items-center justify-center bg-primary text-primary-content">
        <h1 className="text-8xl font-bold">SpoonBot</h1>
        <h2 className="text-3xl mt-3 font-semibold">
          The Restaurant Name and Review Bot
        </h2>
      </div>
    </>
  );
};

export default Home;
