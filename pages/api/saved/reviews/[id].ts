import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectMongo } from '../../../../config/database/connectMongo';
import errorHandler from '../../../../util/error/errorHandler';
import ReviewResultModel from '../../../../models/ReviewResultModel';
import {
  ReviewResultT,
  GetSavedResultsResponse,
} from '../../../../util/APIResponseSchema';
import ServerError from '../../../../util/error/ServerError';

const deleteReviewById = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
    try {
      if (req.method !== 'DELETE') {
        res.setHeader('Allow', ['DELETE']);
        throw new ServerError('Only DELETE requests are allowed.', 405);
      }

      const { user } = getSession(req, res)!;
      const { id } = req.query;
      await connectMongo();

      const data = await ReviewResultModel.findOne<ReviewResultT>({ _id: id });
      if (!data) {
        throw new ServerError('No data found for that id', 404);
      }
      if (data.metadata.createdBy !== user.sub) {
        throw new ServerError("You don't have permission to do that.", 403);
      }
      await ReviewResultModel.deleteOne({ _id: id });

      const status = 200;
      const message = 'Successfully deleted saved review.';
      const success = true;

      const response: GetSavedResultsResponse = {
        status,
        message,
        success,
      };

      res.status(status).json(response);
    } catch (error) {
      errorHandler(error, res);
    }
  },
);

export default deleteReviewById;
