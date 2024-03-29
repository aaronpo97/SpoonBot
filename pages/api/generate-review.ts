import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { createNewSavedReview } from '../../services/savedResults/ReviewService';
import { reviewGenRateLimit } from '../../config/redis/rateLimit';
import { ReviewResultT, SuccessResponse } from '../../util/APIResponseSchema';
import ServerError from '../../util/error/ServerError';
import { ReviewGenRequestBodySchema } from '../../util/RequestSchemas';
import openAICreateReview from '../../openAIRequests/openAICreateReview';
import errorHandler from '../../util/error/errorHandler';

const handler = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
    try {
      if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        throw new ServerError('Only POST requests are permitted.', 405);
      }

      const session = getSession(req, res);
      const { user } = session!;
      const identifier = user.sub;

      const rateLimiter = await reviewGenRateLimit.limit(identifier);

      res.setHeader('X-RateLimit-Limit', rateLimiter.limit);
      res.setHeader('X-RateLimit-Remaining', rateLimiter.remaining);

      if (!rateLimiter.success) {
        throw new ServerError('You are making too many requests.', 429);
      }

      const { body } = req;
      const parseBody = ReviewGenRequestBodySchema.safeParse(body);

      if (!parseBody.success) {
        throw new ServerError(
          'Your request body is invalid. Name and keywords are required.',
          400,
        );
      }

      const { keywords: untrimmedKeywords, name } = parseBody.data;

      const keywords = untrimmedKeywords.map((keyword) => keyword.trim());
      const result = await openAICreateReview({ keywords, name });
      const status = 201;
      const message = 'The AI created a new restaurant review.';
      const success = true;

      const reviewResult: ReviewResultT = {
        input: { keywords, name },
        result: result.trim(),
        metadata: { createdAt: new Date(), createdBy: identifier },
      };

      await createNewSavedReview(reviewResult);
      const responseBody: SuccessResponse = { result, status, message, success };

      res.statusCode = status;
      res.send(responseBody);
    } catch (error) {
      errorHandler(error, res);
    }
  },
);

export default handler;
