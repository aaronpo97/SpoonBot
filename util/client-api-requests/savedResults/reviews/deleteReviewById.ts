import axios from 'axios';
import { APIGetSavedResultsSchema } from '../../../APIResponseSchema';

const deleteReviewById = async (id: string) => {
  const { data } = await axios.delete(`/api/saved/reviews/${id}`);
  const parsedData = APIGetSavedResultsSchema.parse(data);

  return parsedData;
};

export default deleteReviewById;
