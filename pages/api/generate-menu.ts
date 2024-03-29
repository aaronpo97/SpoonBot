import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { MenuGenRequestBodySchema } from '../../util/RequestSchemas';
import { MenuResultT, SuccessResponse } from '../../util/APIResponseSchema';
import ServerError from '../../util/error/ServerError';

import openAiCreateMenu from '../../openAIRequests/openAICreateMenu';
import errorHandler from '../../util/error/errorHandler';
import { createNewSavedMenu } from '../../services/savedResults/MenuService';
import { menuGenRateLimit } from '../../config/redis/rateLimit';

const handler = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
    try {
      if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        throw new ServerError('Only POST requests are permitted.', 405);
      }

      const session = getSession(req, res);
      const { user } = session!;
      const identifier = user.sub as string;
      const rateLimiter = await menuGenRateLimit.limit(identifier);

      res.setHeader('X-RateLimit-Limit', rateLimiter.limit);
      res.setHeader('X-RateLimit-Remaining', rateLimiter.remaining);

      if (!rateLimiter.success) {
        throw new ServerError('You are making too many requests.', 429);
      }

      const { body } = req;
      const parseBody = MenuGenRequestBodySchema.safeParse(body);

      if (!parseBody.success) {
        throw new ServerError(
          'Your request body is invalid. Cuisine and keywords are required.',
          400,
        );
      }

      const { cuisine, name } = parseBody.data;

      const result = await openAiCreateMenu({ cuisine, name });

      const menuResult: MenuResultT = {
        input: { cuisine, name },
        result: result.trim(),
        metadata: { createdAt: new Date(), createdBy: identifier },
      };

      await createNewSavedMenu(menuResult);

      const status = 201;
      const message = 'The AI created a new restaurant menu.';
      const success = true;

      const responseBody: SuccessResponse = { result, status, message, success };

      res.statusCode = status;

      res.send(responseBody);
    } catch (error) {
      errorHandler(error, res);
    }
  },
);
export default handler;
