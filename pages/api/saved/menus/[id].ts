import { NextApiHandler } from 'next';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import {
  deleteMenuById,
  getMenuById,
} from '../../../../services/savedResults/MenuService';
import { connectMongo } from '../../../../config/database/connectMongo';
import ServerError from '../../../../util/error/ServerError';
import { GetSavedResultsResponse } from '../../../../util/APIResponseSchema';
import errorHandler from '../../../../util/error/errorHandler';

const deleteMenu: NextApiHandler<GetSavedResultsResponse> = withApiAuthRequired(
  async (req, res) => {
    try {
      if (req.method !== 'DELETE') {
        res.setHeader('Allow', ['DELETE']);
        throw new ServerError('Only DELETE requests are allowed.', 405);
      }

      const { user } = getSession(req, res)!;
      const { id } = req.query;

      await connectMongo();

      const data = await getMenuById(id as string);
      if (!data) {
        throw new ServerError('No data found for that id', 404);
      }
      if (data.metadata.createdBy !== user.sub) {
        throw new ServerError("You don't have permission to do that.", 403);
      }

      await deleteMenuById(id as string);

      const status = 200;
      const message = 'Successfully deleted saved menu.';
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

export default deleteMenu;
