// send menu gen request using axios

import axios from 'axios';
import { APISuccessResponseSchema } from '../APIResponseSchema';
import { MenuGenRequestBody } from '../RequestSchemas';

const sendMenuGenRequest = async ({ cuisine, name }: MenuGenRequestBody) => {
  const response = await axios.post('/api/generate-menu', {
    cuisine,
    name,
  });

  const { data } = response;
  const parseAsSuccessRes = APISuccessResponseSchema.safeParse(data);

  if (!parseAsSuccessRes.success) {
    throw new Error('Something went wrong.');
  }
  console.log(parseAsSuccessRes.data);
  return parseAsSuccessRes.data;
};

export default sendMenuGenRequest;
