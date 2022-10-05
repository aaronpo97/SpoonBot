import mongoose, { model, models, Schema } from 'mongoose';
import { z } from 'zod';
import { ReviewResultT } from '../util/APIResponseSchema';

export interface SavedReview {
  input: {
    keywords: string[];
    name: string;
  };
  result: string;
  metadata: {
    createdAt: Date;
    createdBy: string;
  };
}

const reviewResultSchema = new Schema<ReviewResultT>({
  input: {
    keywords: [Schema.Types.String],
    name: Schema.Types.String,
  },
  result: Schema.Types.String,
  metadata: {
    createdAt: Schema.Types.Date,
    createdBy: Schema.Types.String,
  },
});

const ReviewResultModel =
  models.ReviewResult || model('ReviewResult', reviewResultSchema);

export default ReviewResultModel;
