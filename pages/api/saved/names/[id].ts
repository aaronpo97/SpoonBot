import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { GetSavedResultsResponse, NameResultT } from '../../../../util/APIResponseSchema';
import NameResultModel from '../../../../models/NameResultModel';
import { connectMongo } from '../../../../config/database/connectMongo';
import ServerError from '../../../../util/error/ServerError';
import errorHandler from '../../../../util/error/errorHandler';

const deleteNameById = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
    try {
      if (req.method !== 'DELETE') {
        res.setHeader('Allow', ['DELETE']);
        throw new ServerError('Only DELETE requests are allowed.', 405);
      }

      const { user } = getSession(req, res)!;

      const { id } = req.query;

      await connectMongo();
      const data = await NameResultModel.findOne<NameResultT>({ _id: id });
      if (!data) {
        throw new ServerError('No data found for that id', 404);
      }

      if (data.metadata.createdBy !== user.sub) {
        throw new ServerError("You don't have permission to do that.", 403);
      }

      await NameResultModel.deleteOne({ _id: id! });

      const status = 200;
      const message = 'Successfully deleted saved name.';
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

export default deleteNameById;
