import { NextApiResponse } from 'next';
import { ErrorResponse } from '../APIResponseSchema';
import ServerError from './ServerError';

const errorHandler = (error: unknown, res: NextApiResponse<unknown>) => {
  const isServerError = error instanceof ServerError;
  const message = isServerError ? error.message : 'Something went wrong.';
  const status = isServerError ? error.status : 500;

  const responseBody: ErrorResponse = { message, status, success: false };

  res.statusCode = status;
  res.send(responseBody);
};

export default errorHandler;
