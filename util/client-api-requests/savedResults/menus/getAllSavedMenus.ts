import axios from 'axios';
import { z } from 'zod';
import {
  APIGetSavedResultsSchema,
  MenuResultZodSchema,
} from '../../../APIResponseSchema';

const getAllSavedMenus = async () => {
  const { data } = await axios.get('/api/saved/menus');
  const parsedData = APIGetSavedResultsSchema.parse(data);
  const payload = z.array(MenuResultZodSchema).parse(parsedData.data);
  return payload;
};

export default getAllSavedMenus;
