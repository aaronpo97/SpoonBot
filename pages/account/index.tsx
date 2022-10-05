import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import SavedHistoryLayout from '../../components/savedHistory/SavedHistoryLayout';

const SavedIndex: NextPage = () => {
  return (
    <SavedHistoryLayout isLoading={false}>
      <div>
        <h3>Use the sidebar to navigate to your saved reviews, menus, and names.</h3>
      </div>
    </SavedHistoryLayout>
  );
};

export default SavedIndex;
export const getServerSideProps = withPageAuthRequired();
