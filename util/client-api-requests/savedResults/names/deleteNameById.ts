import axios from 'axios';
import { APIGetSavedResultsSchema } from '../../../APIResponseSchema';

const deleteNameById = async (id: string) => {
  const { data } = await axios.delete(`/api/saved/names/${id}`);

  const parsedData = APIGetSavedResultsSchema.parse(data);
  return parsedData;
};

export default deleteNameById;
