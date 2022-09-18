import openai from '../config/openai';
import ServerError from '../util/ServerError';
import { ResponseBody } from '../validationSchema';

const generatePrompt = ({ keywords, cuisine, location }: ResponseBody) => {
  const prompt = `
You are a restaurant name generating AI.

Using the information below, create a new name for a restaurant. The name should be as creative as possible.

keywords: ${keywords.join(', ')}
cuisine: ${cuisine}
location: ${location}

This restaurant is called:`;
  return prompt;
};

const sendOpenAIRequest = async ({ keywords, cuisine, location }: ResponseBody) => {
  try {
    // const prompt = generatePrompt({
    //   keywords,
    //   cuisine,
    //   location,
    // });
    // const result = await openai.createCompletion({
    //   model: 'text-curie-001',
    //   prompt,
    //   max_tokens: 100,
    // });
    // return result.data.choices![0].text!.replace(/[\r\n]/gm, '');

    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });

    return 'Currently testing UI only.';
  } catch {
    throw new ServerError('The server failed to send a request to OpenAI.', 500);
  }
};

export default sendOpenAIRequest;
