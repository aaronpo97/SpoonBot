/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable no-underscore-dangle */
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { NextPage } from 'next';
import SavedHistoryLayout from '../../../components/savedHistory/SavedHistoryLayout';
import {
  APIGetSavedResultsSchema,
  ReviewResultZodSchema,
  ReviewResultT,
} from '../../../util/APIResponseSchema';
import SavedReview from '../../../components/savedHistory/SavedReview';

interface SavedReviewsPageProps {}

// get all reviews from the database from  /api/saved-reviews

const getAllReviews = async () => {
  const { data } = await axios.get('/api/saved/reviews');
  const parsedData = APIGetSavedResultsSchema.parse(data);
  const payload = z.array(ReviewResultZodSchema).parse(parsedData.data);
  return payload;
};

const deleteReviewById = async (id: string) => {
  const { data } = await axios.delete(`/api/saved/reviews/${id}`);
  const parsedData = APIGetSavedResultsSchema.parse(data);

  return parsedData;
};

const SavedReviewsPage: NextPage<SavedReviewsPageProps> = () => {
  const [reviews, setReviews] = useState<ReviewResultT[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllReviews().then((data) => {
      setReviews(data);
      setIsLoading(false);
    });
  }, []);

  const handleDelete = async (id: string) => {
    await deleteReviewById(id);
    setReviews(reviews.filter((review) => review._id !== id));
  };

  return (
    <SavedHistoryLayout isLoading={isLoading} currentSidebarItem="reviews">
      {reviews.map((review) => (
        <SavedReview
          handleDelete={handleDelete}
          review={review}
          key={review._id as string}
        />
      ))}
    </SavedHistoryLayout>
  );
};

export default SavedReviewsPage;
export const getServerSideProps = withPageAuthRequired();
