import axios from 'axios';
import { z } from 'zod';
import {
  APIGetSavedResultsSchema,
  ReviewResultZodSchema,
} from '../../../APIResponseSchema';

const getAllReviews = async () => {
  const { data } = await axios.get('/api/saved/reviews');
  const parsedData = APIGetSavedResultsSchema.parse(data);
  const payload = z.array(ReviewResultZodSchema).parse(parsedData.data);
  return payload;
};

export default getAllReviews;
