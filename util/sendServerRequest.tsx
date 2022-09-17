import axios from 'axios';
import { APISuccessResponseSchema } from './Response';
import { ResponseBody } from '../validationSchema';

const sendServerRequest = async ({ cuisine, keywords, location }: ResponseBody) => {
  const response = await axios.post('/api/generate', { cuisine, keywords, location });

  const { data } = response;
  const parseAsSuccessRes = APISuccessResponseSchema.safeParse(data);

  if (!parseAsSuccessRes.success) {
    throw new Error('Something went wrong.');
  }
  return parseAsSuccessRes.data;
};

export default sendServerRequest;
