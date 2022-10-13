import { NextApiHandler } from 'next';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import {
  deleteMenuById,
  getMenuById,
} from '../../../../services/savedResults/MenuService';

import ServerError from '../../../../util/error/ServerError';
import { GetSavedResultsResponse } from '../../../../util/APIResponseSchema';
import errorHandler from '../../../../util/error/errorHandler';

const menuByIdHandler: NextApiHandler<GetSavedResultsResponse> = withApiAuthRequired(
  async (req, res) => {
    try {
      const { user } = getSession(req, res)!;
      const { id } = req.query;

      const savedMenu = await getMenuById(id as string);
      if (!savedMenu) {
        throw new ServerError('No menu found for that id', 404);
      }

      switch (req.method) {
        case 'GET': {
          const status = 200;
          const message = `Getting the menu with the id of ${id}`;
          const success = true;

          const response: GetSavedResultsResponse = {
            status,
            message,
            success,
            data: savedMenu,
          };

          res.status(status).json(response);
          return;
        }

        case 'DELETE': {
          if (savedMenu.metadata.createdBy !== user.sub) {
            throw new ServerError("You don't have permission to do that.", 403);
          }
          await deleteMenuById(id as string);

          const status = 200;
          const message = 'Successfully deleted saved menu.';
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

export default menuByIdHandler;
