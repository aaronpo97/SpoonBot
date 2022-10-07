import axios from 'axios';
import { APISuccessResponseSchema } from '../../APIResponseSchema';
import { ReviewGenRequestBody } from '../../RequestSchemas';

const sendReviewGenRequest = async ({ name, keywords }: ReviewGenRequestBody) => {
  const response = await axios.post('/api/generate-review', { name, keywords });

  const { data } = response;
  const parseAsSuccessRes = APISuccessResponseSchema.safeParse(data);

  if (!parseAsSuccessRes.success) {
    throw new Error('Something went wrong.');
  }
  return parseAsSuccessRes.data;
};

export default sendReviewGenRequest;
