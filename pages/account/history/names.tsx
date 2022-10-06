/* eslint-disable no-underscore-dangle */
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { NextPage } from 'next';
import { FC, useEffect, useState } from 'react';
import { z } from 'zod';
import SavedHistoryLayout from '../../../components/savedHistory/SavedHistoryLayout';
import SavedResultCard, {
  SavedResultLeft,
  SavedResultRight,
} from '../../../components/savedHistory/SavedResultCard';
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

const deleteNameById = async (id: string) => {
  const { data } = await axios.delete(`/api/saved/names/${id}`);
  const parsedData = APIGetSavedResultsSchema.parse(data);
  return parsedData;
};

const SavedName: FC<{
  name: NameResultT;
  // eslint-disable-next-line no-unused-vars
  handleDelete: (id: string) => Promise<void>;
}> = ({ name, handleDelete }) => {
  return (
    <SavedResultCard
      handleDelete={handleDelete}
      resource={name}
      deleteTooltipLabel="Delete Name"
    >
      <SavedResultLeft>
        <div className="w-full p-2">
          <h3 className="font-bold uppercase my-1 text-xl">Cuisine</h3>
          <p className="font-semibold text-lg">{name.input.cuisine}</p>
        </div>
        <div className="w-full p-2">
          <h3 className="font-bold uppercase my-1 text-xl">Keywords/Phrases</h3>
          <ul className="list-disc list-inside">
            {name.input.keywords.map((keyword) => (
              <li className="text-lg">{keyword}</li>
            ))}
          </ul>
        </div>
      </SavedResultLeft>
      <SavedResultRight>
        <div className="w-full p-2">
          <h3 className="font-bold uppercase my-1 text-xl">Name</h3>
          <p className="font-semibold text-6xl">{name.result}</p>
        </div>
      </SavedResultRight>
    </SavedResultCard>
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

  const handleDelete = async (id: string) => {
    await deleteNameById(id);
    setNames(names.filter((name) => name._id !== id));
  };

  return (
    <SavedHistoryLayout currentSidebarItem="names" isLoading={isLoading}>
      {names.map((name) => {
        return (
          <SavedName key={name._id as string} name={name} handleDelete={handleDelete} />
        );
      })}
    </SavedHistoryLayout>
  );
};

export default SavedNamesPage;
export const getServerSideProps = withPageAuthRequired();
