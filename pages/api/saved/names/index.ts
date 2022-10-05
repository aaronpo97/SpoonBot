import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectMongo } from '../../../../config/database/connectMongo';
import errorHandler from '../../../../util/error/errorHandler';
import NameResultModel from '../../../../models/NameResultModel';
import { GetSavedResultsResponse } from '../../../../util/APIResponseSchema';

const getSavedNames = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
    try {
      const { user } = getSession(req, res)!;
      await connectMongo();

      const nameResult = await NameResultModel.find({ 'metadata.createdBy': user.sub });

      const status = 200;
      const message = 'Successfully retrieved saved restaurant names.';
      const success = true;
      const data = nameResult;

      const response: GetSavedResultsResponse = { data, status, message, success };

      res.status(status).json(response);
    } catch (error) {
      errorHandler(error, res);
    }
  },
);
export default getSavedNames;
