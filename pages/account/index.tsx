import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import Head from 'next/head';
import SavedHistoryLayout from '../../components/savedHistory/SavedHistoryLayout';

const SavedIndex: NextPage = () => {
  return (
    <>
      <Head>
        <title>Saved History</title>
      </Head>
      <SavedHistoryLayout isLoading={false}>
        <div className="flex h-full flex-col items-center justify-center">
          <p className="text-center text-2xl font-bold">
            Navigate to your saved reviews, menus, or names.
          </p>
        </div>
      </SavedHistoryLayout>
    </>
  );
};

export default SavedIndex;
export const getServerSideProps = withPageAuthRequired();
