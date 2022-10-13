import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  getReviewById,
  deleteReviewById,
} from '../../../../services/savedResults/ReviewService';
import errorHandler from '../../../../util/error/errorHandler';

import { GetSavedResultsResponse } from '../../../../util/APIResponseSchema';
import ServerError from '../../../../util/error/ServerError';

const deleteReview = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
    try {
      const { user } = getSession(req, res)!;
      const { id } = req.query;

      const savedReview = await getReviewById(id as string);
      if (!savedReview) {
        throw new ServerError('No data found for that id', 404);
      }

      switch (req.method) {
        case 'GET': {
          const status = 200;
          const message = `Getting the review with the id of ${id}`;
          const success = true;

          const response: GetSavedResultsResponse = {
            status,
            message,
            success,
            data: savedReview,
          };

          res.status(status).json(response);

          return;
        }

        case 'DELETE': {
          if (savedReview.metadata.createdBy !== user.sub) {
            throw new ServerError("You don't have permission to do that.", 403);
          }

          await deleteReviewById(id as string);

          const status = 200;
          const message = 'Successfully deleted saved review.';
          const success = true;

          const response: GetSavedResultsResponse = {
            status,
            message,
            success,
          };

          res.status(status).json(response);
          return;
        }

        default: {
          res.setHeader('Allow', ['GET', 'DELETE']);
          throw new ServerError("Only 'GET' and 'DELETE' are allowed.", 405);
        }
      }
    } catch (error) {
      errorHandler(error, res);
    }
  },
);

export default deleteReview;
