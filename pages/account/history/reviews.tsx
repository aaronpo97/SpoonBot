/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable no-underscore-dangle */
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import SavedHistoryLayout from '../../../components/savedHistory/SavedHistoryLayout';
import { ReviewResultT } from '../../../util/APIResponseSchema';
import SavedReview from '../../../components/savedHistory/SavedReview';
import deleteReviewById from '../../../util/client-api-requests/savedResults/reviews/deleteReviewById';
import getAllReviews from '../../../util/client-api-requests/savedResults/reviews/getAllReviews';

interface SavedReviewsPageProps {}

// get all reviews from the database from  /api/saved-reviews

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
    const response = await deleteReviewById(id);

    if (response.success) {
      setReviews(reviews.filter((review) => review._id !== id));
    }
  };

  return (
    <>
      <Head>
        <title>Saved Reviews</title>
      </Head>
      <SavedHistoryLayout isLoading={isLoading} currentSidebarItem="reviews">
        {reviews.map((review) => (
          <SavedReview
            handleDelete={handleDelete}
            review={review}
            key={review._id as string}
          />
        ))}
      </SavedHistoryLayout>
    </>
  );
};

export default SavedReviewsPage;
export const getServerSideProps = withPageAuthRequired();
