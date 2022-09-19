import { NextApiRequest, NextApiResponse } from 'next';
import requestIp from 'request-ip';
import { reviewGenRateLimit } from '../../config/redis/rateLimit';

import { SuccessResponse, ErrorResponse } from '../../util/APIResponseSchema';

import ServerError from '../../util/error/ServerError';
import { ReviewGenRequestBodySchema } from '../../util/RequestSchemas';

import openAICreateReview from '../../openAIRequests/openAICreateReview';

const handler = async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      throw new ServerError('Only POST requests are permitted.', 405);
    }

    const identifier = requestIp.getClientIp(req)!;
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

    const { keywords, name } = parseBody.data;
    const result = await openAICreateReview({ keywords, name });
    const status = 201;
    res.statusCode = status;

    const responseBody: SuccessResponse = {
      result,
      status,
      message: 'The AI created a new restaurant review.',
      success: true,
    };

    res.send(responseBody);
  } catch (error) {
    const message =
      error instanceof ServerError ? error.message : 'Something went wrong.';
    const status = error instanceof ServerError ? error.status : 500;

    res.statusCode = status;

    const responseBody: ErrorResponse = { message, status, success: false };
    res.send(responseBody);
  }
};

export default handler;
