import { APIErrorResponseSchema, APISuccessResponseSchema } from './Response';
import { ResponseBody } from '../validationSchema';

const sendServerRequest = async ({ cuisine, keywords }: ResponseBody) => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    body: JSON.stringify({ cuisine, keywords }),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();

  const parsedData = APISuccessResponseSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error('Something went wrong.');
  }

  return parsedData.data;
};

export default sendServerRequest;
