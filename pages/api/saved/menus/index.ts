import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import errorHandler from '../../../../util/error/errorHandler';
import {
  GetSavedResultsResponse,
  MenuResultZodSchema,
} from '../../../../util/APIResponseSchema';
import { getAllUserMenus } from '../../../../services/savedResults/MenuService';

const getSavedMenus = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
    try {
      const { user } = getSession(req, res)!;
      const menus = await getAllUserMenus(user.sub);
      const data = z.array(MenuResultZodSchema).parse(menus);
      const status = 200;
      const message = 'Successfully retrieved saved menus.';
      const success = true;

      const response: GetSavedResultsResponse = { data, status, message, success };

      res.status(status).json(response);
    } catch (error) {
      errorHandler(error, res);
    }
  },
);
export default getSavedMenus;
