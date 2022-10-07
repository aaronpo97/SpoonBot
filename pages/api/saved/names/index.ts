import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import errorHandler from '../../../../util/error/errorHandler';
import {
  GetSavedResultsResponse,
  NameResultZodSchema,
} from '../../../../util/APIResponseSchema';
import { getAllUserSavedNames } from '../../../../services/savedResults/NameService';

const getSavedNames = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
    try {
      const { user } = getSession(req, res)!;
      const names = await getAllUserSavedNames(user.sub);

      const data = z.array(NameResultZodSchema).parse(names);
      const status = 200;
      const message = 'Successfully retrieved saved restaurant names.';
      const success = true;

      const response: GetSavedResultsResponse = { data, status, message, success };

      res.status(status).json(response);
    } catch (error) {
      errorHandler(error, res);
    }
  },
);
export default getSavedNames;
