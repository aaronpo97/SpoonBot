import { connectMongo } from '../../config/database/connectMongo';
import ReviewResultModel from '../../models/ReviewResultModel';
import { ReviewResultT } from '../../util/APIResponseSchema';

export const getAllUserReviews = async (userId: string): Promise<ReviewResultT[]> => {
  await connectMongo();
  const reviews = await ReviewResultModel.find<ReviewResultT>(
    { 'metadata.createdBy': userId },
    null,
    {
      sort: { 'metadata.createdAt': -1 },
    },
  );

  return reviews;
};

export const deleteReviewById = async (id: string): Promise<void> => {
  await connectMongo();
  await ReviewResultModel.findByIdAndDelete(id);
};

export const getReviewById = async (id: string): Promise<ReviewResultT | null> => {
  await connectMongo();
  const review = await ReviewResultModel.findById<ReviewResultT>(id);

  return review;
};

export const createNewSavedReview = async (
  review: ReviewResultT,
): Promise<ReviewResultT> => {
  await connectMongo();
  const newSavedReview = await ReviewResultModel.create<ReviewResultT>(review);

  return newSavedReview;
};
