import axios from 'axios';
import { z } from 'zod';
import {
  APIGetSavedResultsSchema,
  NameResultZodSchema,
} from '../../../APIResponseSchema';

const getAllNames = async () => {
  const { data } = await axios.get('/api/saved/names');
  const parsedData = APIGetSavedResultsSchema.parse(data);
  const payload = z.array(NameResultZodSchema).parse(parsedData.data);
  return payload;
};

export default getAllNames;
