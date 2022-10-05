/* eslint-disable no-underscore-dangle */
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { NextPage } from 'next';
import { FC, useEffect, useState } from 'react';
import { z } from 'zod';
import SavedHistoryLayout from '../../../components/savedHistory/SavedHistoryLayout';
import {
  APIGetSavedResultsSchema,
  NameResultT,
  NameResultZodSchema,
} from '../../../util/APIResponseSchema';

interface SavedReviewsPageProps {}

// get all reviews from the database from  /api/saved-reviews

const getAllNames = async () => {
  const { data } = await axios.get('/api/saved/names');
  const parsedData = APIGetSavedResultsSchema.parse(data);
  const payload = z.array(NameResultZodSchema).parse(parsedData.data);
  return payload;
};

const SavedName: FC<{ name: NameResultT }> = ({ name }) => {
  return (
    <div className="flex flex-row my-6 bg-slate-200 p-10 rounded-xl shadow-lg">
      <div className="lg:w-4/12">
        <div className="mb-3">
          <h3 className="font-bold uppercase">Cuisine</h3>
          <p className="text-xl">{name.input.cuisine}</p>
        </div>
        <div className="mb-3">
          <h3 className="font-bold uppercase">Keywords/Phrases</h3>
          <ul>
            {name.input.keywords.map((keyword) => (
              <li key={keyword} className="w-full list-disc list-inside">
                {keyword}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="lg:w-8/12">
        <h3 className="font-bold uppercase mb-2">Spoonbot&apos;s Generated Name</h3>
        <div className="h-full flex flex-col">
          <span className="text-5xl font-bold">{name.result}</span>
        </div>
      </div>
    </div>
  );
};

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

  return (
    <SavedHistoryLayout currentSidebarItem="names" isLoading={isLoading}>
      {names.map((name) => {
        return <SavedName key={name._id as string} name={name} />;
      })}
    </SavedHistoryLayout>
  );
};

export default SavedNamesPage;
export const getServerSideProps = withPageAuthRequired();
