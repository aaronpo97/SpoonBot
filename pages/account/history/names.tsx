/* eslint-disable no-underscore-dangle */

import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import SavedHistoryLayout from '../../../components/savedHistory/SavedHistoryLayout';
import SavedNameCard from '../../../components/savedHistory/SavedNameCard';
import { NameResultT } from '../../../util/APIResponseSchema';
import deleteNameById from '../../../util/client-api-requests/savedResults/names/deleteNameById';
import getAllNames from '../../../util/client-api-requests/savedResults/names/getAllNames';

interface SavedReviewsPageProps {}

// get all reviews from the database from  /api/saved-reviews

const SavedNamesPage: NextPage<SavedReviewsPageProps> = () => {
  const [names, setNames] = useState<NameResultT[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllNames().then((data) => {
      setIsLoading(true);
      setNames(data);
      setIsLoading(false);
    });
  }, []);

  const handleDelete = async (id: string) => {
    const response = await deleteNameById(id);
    if (response.success) {
      setNames(names.filter((name) => name._id !== id));
    }
  };

  return (
    <>
      <Head>
        <title>Saved Names</title>
      </Head>
      <SavedHistoryLayout currentSidebarItem="names" isLoading={isLoading}>
        {names.map((name) => {
          return (
            <SavedNameCard
              key={name._id as string}
              name={name}
              handleDelete={handleDelete}
            />
          );
        })}
      </SavedHistoryLayout>
    </>
  );
};

export default SavedNamesPage;
export const getServerSideProps = withPageAuthRequired();
