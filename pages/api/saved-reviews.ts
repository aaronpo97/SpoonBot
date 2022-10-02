import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import {
  GetSavedResultsResponse,
  ReviewResultZodSchema,
} from '../../util/APIResponseSchema';
import { connectMongo } from '../../config/database/connectMongo';
import ReviewResultModel from '../../models/ReviewResultModel';

const handler = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
    try {
      const { user } = getSession(req, res)!;

      await connectMongo();
      const reviews = await ReviewResultModel.find({
        'metadata.createdBy': user.sub,
      });

      const status = 200;
      const message = 'Successfully retrieved saved reviews.';
      const success = true;
      const data = z.array(ReviewResultZodSchema).parse(reviews);

      const response: GetSavedResultsResponse = {
        status,
        message,
        success,
        data,
      };

      res.status(status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },
);

export default handler;
