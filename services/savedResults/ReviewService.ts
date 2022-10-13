import { connectMongo } from '../../config/database/connectMongo';
import ReviewResultModel from '../../models/ReviewResultModel';
import { ReviewResultT } from '../../util/APIResponseSchema';

export const getAllUserReviews = async (userId: string): Promise<ReviewResultT[]> => {
  await connectMongo();
  return ReviewResultModel.find<ReviewResultT>({ 'metadata.createdBy': userId }, null, {
    sort: { 'metadata.createdAt': -1 },
  });
};

export const deleteReviewById = async (id: string): Promise<ReviewResultT | null> => {
  await connectMongo();
  return ReviewResultModel.findByIdAndDelete(id);
};

export const getReviewById = async (id: string): Promise<ReviewResultT | null> => {
  await connectMongo();
  return ReviewResultModel.findById<ReviewResultT>(id);
};

export const createNewSavedReview = async (
  review: ReviewResultT,
): Promise<ReviewResultT> => {
  await connectMongo();
  return ReviewResultModel.create<ReviewResultT>(review);
};
