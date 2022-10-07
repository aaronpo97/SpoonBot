/* eslint-disable no-underscore-dangle */
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import SavedHistoryLayout from '../../../components/savedHistory/SavedHistoryLayout';
import SavedMenuCard from '../../../components/savedHistory/SavedMenuCard';
import { MenuResultT } from '../../../util/APIResponseSchema';
import deleteMenuById from '../../../util/client-api-requests/savedResults/menus/deleteMenuById';
import getAllSavedMenus from '../../../util/client-api-requests/savedResults/menus/getAllSavedMenus';

interface SavedReviewsPageProps {}

const SavedMenusPage: NextPage<SavedReviewsPageProps> = () => {
  const [menus, setMenus] = useState<MenuResultT[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllSavedMenus().then((data) => {
      setMenus(data);
      setIsLoading(false);
    });
  }, []);

  const handleDelete = async (id: string) => {
    const response = await deleteMenuById(id);
    if (response.success) {
      setMenus(menus.filter((menu) => menu._id !== id));
    }
  };

  return (
    <>
      <Head>
        <title>Saved Menus</title>
      </Head>
      <SavedHistoryLayout isLoading={isLoading} currentSidebarItem="menus">
        {menus.map((menu) => {
          return (
            <SavedMenuCard
              key={menu._id as string}
              menu={menu}
              handleDelete={handleDelete}
            />
          );
        })}
      </SavedHistoryLayout>
    </>
  );
};

export default SavedMenusPage;
export const getServerSideProps = withPageAuthRequired();
