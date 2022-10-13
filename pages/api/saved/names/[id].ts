import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import {
  deleteNameById,
  getNameById,
} from '../../../../services/savedResults/NameService';
import { GetSavedResultsResponse } from '../../../../util/APIResponseSchema';
import ServerError from '../../../../util/error/ServerError';
import errorHandler from '../../../../util/error/errorHandler';

const nameByIdHandler = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
    try {
      const { user } = getSession(req, res)!;
      const { id } = req.query;

      const savedName = await getNameById(id as string);
      if (!savedName) {
        throw new ServerError('No name found for that id', 404);
      }

      switch (req.method) {
        case 'GET': {
          const status = 200;
          const message = `Getting the name with the id of ${id}`;
          const success = true;

          const response: GetSavedResultsResponse = {
            status,
            message,
            success,
            data: savedName,
          };

          res.status(status).json(response);
          return;
        }

        case 'DELETE': {
          if (savedName.metadata.createdBy !== user.sub) {
            throw new ServerError("You don't have permission to do that.", 403);
          }
          await deleteNameById(id as string);

          const status = 200;
          const message = 'Successfully deleted saved name.';
          const success = true;

          const response: GetSavedResultsResponse = { status, message, success };
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

export default nameByIdHandler;
