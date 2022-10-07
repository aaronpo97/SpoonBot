import axios from 'axios';
import { APIGetSavedResultsSchema } from '../../../APIResponseSchema';

const deleteMenuById = async (id: string) => {
  const response = await axios.delete(`/api/saved/menus/${id}`);
  const parsedData = APIGetSavedResultsSchema.parse(response.data);

  return parsedData;
};

export default deleteMenuById;
