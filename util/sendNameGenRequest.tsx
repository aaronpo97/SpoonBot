import axios from 'axios';
import { APISuccessResponseSchema } from './Response';
import { NameGenResponseBody } from '../validationSchema';

const sendNameGenRequest = async ({
  cuisine,
  keywords,
  location,
}: NameGenResponseBody) => {
  const response = await axios.post('/api/generate-name', {
    cuisine,
    keywords,
    location,
  });

  const { data } = response;
  const parseAsSuccessRes = APISuccessResponseSchema.safeParse(data);

  if (!parseAsSuccessRes.success) {
    throw new Error('Something went wrong.');
  }
  return parseAsSuccessRes.data;
};

export default sendNameGenRequest;
