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
        <div>
          <p className="text-lg">
            Use the sidebar to navigate to your saved reviews, menus, and names.
          </p>
        </div>
      </SavedHistoryLayout>
    </>
  );
};

export default SavedIndex;
export const getServerSideProps = withPageAuthRequired();
