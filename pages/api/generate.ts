import { NextApiRequest, NextApiResponse } from 'next';
import requestIp from 'request-ip';

import { SuccessResponse, ErrorResponse } from '../../util/Response';
import sendOpenAIRequest from '../../backend/sendOpenAIRequest';
import ServerError from '../../util/ServerError';
import { responseBodySchema } from '../../validationSchema';
import ratelimit from '../../config/redis/rateLimit';

// Create a new ratelimiter, that allows 5 requests per 5 seconds

const handler = async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      throw new ServerError('Only POST requests are permitted.', 405);
    }

    const identifier = requestIp.getClientIp(req)!;
    const rateLimiter = await ratelimit.limit(identifier);

    res.setHeader('X-RateLimit-Limit', rateLimiter.limit);
    res.setHeader('X-RateLimit-Remaining', rateLimiter.remaining);

    if (!rateLimiter.success) {
      throw new ServerError('You are making too many requests.', 429);
    }

    const { body } = req;
    const parseBody = responseBodySchema.safeParse(body);

    if (!parseBody.success) {
      throw new ServerError(
        'Your request body is invalid. Cuisine and keywords are required.',
        400,
      );
    }

    const result = await sendOpenAIRequest(parseBody.data);
    const status = 201;
    res.statusCode = status;

    const responseBody: SuccessResponse = {
      result,
      status,
      message: 'Created a new restaurant name.',
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
