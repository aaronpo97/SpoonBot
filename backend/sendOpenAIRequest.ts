import openai from '../config/openai';
import ServerError from '../util/ServerError';
import { ResponseBody } from '../validationSchema';

const generatePrompt = ({ keywords, cuisine, location }: ResponseBody) => {
  const prompt = `
  You are a restaurant name generating AI.
  Please follow the proceeding instructions.
  
  Using the information below, create a new name for a restaurant.
  
  keywords: ${keywords.join(', ')}
  cuisine: ${cuisine}
  location: ${location}

  The name for the restaurant will be:`;
  return prompt;
};

const sendOpenAIRequest = async ({ keywords, cuisine, location }: ResponseBody) => {
  try {
    const prompt = generatePrompt({
      keywords,
      cuisine,
      location,
    });
    const result = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt,
      max_tokens: 100,
    });
    return result.data.choices![0].text!.replace(/[\r\n]/gm, '');
  } catch {
    throw new ServerError('The server failed to send a request to OpenAI.', 500);
  }
};

export default sendOpenAIRequest;
