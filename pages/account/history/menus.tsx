/* eslint-disable no-underscore-dangle */
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import SavedHistoryLayout from '../../../components/savedHistory/SavedHistoryLayout';
import SavedMenuCard from '../../../components/savedHistory/SavedMenuCard';
import {
  APIGetSavedResultsSchema,
  MenuResultZodSchema,
  MenuResultT,
} from '../../../util/APIResponseSchema';

interface SavedReviewsPageProps {}

// get all reviews from the database from  /api/saved-reviews

const getAllMenus = async () => {
  const { data } = await axios.get('/api/saved/menus');
  const parsedData = APIGetSavedResultsSchema.parse(data);
  const payload = z.array(MenuResultZodSchema).parse(parsedData.data);
  return payload;
};

const deleteMenuById = async (id: string) => {
  const response = await axios.delete(`/api/saved/menus/${id}`);
  const parsedData = APIGetSavedResultsSchema.parse(response.data);

  return parsedData;
};

const SavedMenusPage: NextPage<SavedReviewsPageProps> = () => {
  const [menus, setMenus] = useState<MenuResultT[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllMenus().then((data) => {
      setMenus(data);
      setIsLoading(false);
    });
  }, []);

  const handleDelete = async (id: string) => {
    const response = await deleteMenuById(id);
    if (response.success) {
      setMenus((prev) => prev.filter((menu) => menu._id !== id));
    } else {
      console.error(response.message);
    }
  };

  return (
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
  );
};

export default SavedMenusPage;
export const getServerSideProps = withPageAuthRequired();
