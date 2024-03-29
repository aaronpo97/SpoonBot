import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NameResultT, SuccessResponse } from '../../util/APIResponseSchema';
import { createNewSavedName } from '../../services/savedResults/NameService';
import ServerError from '../../util/error/ServerError';
import { NameGenRequestBodySchema } from '../../util/RequestSchemas';
import openAICreateName from '../../openAIRequests/openAICreateName';
import { nameGenRateLimit } from '../../config/redis/rateLimit';
import errorHandler from '../../util/error/errorHandler';

const handler = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
    try {
      if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        throw new ServerError('Only POST requests are permitted.', 405);
      }

      const session = getSession(req, res)!;
      const { user } = session;
      const identifier = user.sub as string;
      const rateLimiter = await nameGenRateLimit.limit(identifier);

      res.setHeader('X-RateLimit-Limit', rateLimiter.limit);
      res.setHeader('X-RateLimit-Remaining', rateLimiter.remaining);

      if (!rateLimiter.success) {
        throw new ServerError('You are making too many requests.', 429);
      }

      const { body } = req;
      const parseBody = NameGenRequestBodySchema.safeParse(body);

      if (!parseBody.success) {
        throw new ServerError(
          'Your request body is invalid. Cuisine and keywords are required.',
          400,
        );
      }

      const { cuisine, keywords, location } = parseBody.data;

      const result = await openAICreateName({
        cuisine,
        keywords: keywords.map((keyword) => keyword.trim()),
        location,
      });

      const status = 201;
      const message = 'The AI created a new restaurant name.';
      const success = true;

      const nameResult: NameResultT = {
        input: { cuisine, keywords: keywords.map((keyword) => keyword.trim()), location },
        result: result.trim(),
        metadata: { createdAt: new Date(), createdBy: identifier },
      };

      await createNewSavedName(nameResult);

      const responseBody: SuccessResponse = { result, status, message, success };

      res.statusCode = status;
      res.send(responseBody);
    } catch (error) {
      errorHandler(error, res);
    }
  },
);
export default handler;
