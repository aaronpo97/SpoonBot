import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { getAllUserReviews } from '../../../../services/savedResults/ReviewService';
import {
  ReviewResultZodSchema,
  GetSavedResultsResponse,
} from '../../../../util/APIResponseSchema';
import errorHandler from '../../../../util/error/errorHandler';

const getSavedReviews = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
    try {
      const { user } = getSession(req, res)!;

      const reviews = await getAllUserReviews(user.sub);

      const data = z.array(ReviewResultZodSchema).parse(reviews);
      const message = 'Successfully retrieved saved reviews.';
      const status = 200;
      const success = true;

      const response: GetSavedResultsResponse = { status, message, success, data };

      res.status(status).json(response);
    } catch (error) {
      errorHandler(error, res);
    }
  },
);

export default getSavedReviews;
