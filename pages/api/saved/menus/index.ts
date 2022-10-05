import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { connectMongo } from '../../../../config/database/connectMongo';
import errorHandler from '../../../../util/error/errorHandler';
import MenuResultModel from '../../../../models/MenuResultModel';
import {
  GetSavedResultsResponse,
  MenuResultZodSchema,
} from '../../../../util/APIResponseSchema';

const getSavedMenus = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
    try {
      const { user } = getSession(req, res)!;
      await connectMongo();
      const unparsedMenus = await MenuResultModel.find({
        'metadata.createdBy': user.sub,
      });

      const data = z.array(MenuResultZodSchema).parse(unparsedMenus);
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
