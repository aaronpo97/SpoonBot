import openai from '../config/openai';
import ServerError from '../util/ServerError';
import { NameGenResponseBody } from '../validationSchema';

const generatePrompt = ({ keywords, cuisine, location }: NameGenResponseBody) => {
  const prompt = `
You are a restaurant name generating AI.

Using the information below, create a new name for a restaurant. The name should be as creative as possible.

keywords: ${keywords.join(', ')}
cuisine: ${cuisine}
location: ${location}

This restaurant is called:`;
  return prompt;
};

const openAICreateName = async ({ keywords, cuisine, location }: NameGenResponseBody) => {
  try {
    const prompt = generatePrompt({
      keywords,
      cuisine,
      location,
    });
    const result = await openai.createCompletion({
      model: 'text-curie-001',
      prompt,
      max_tokens: 100,
    });
    return result.data.choices![0].text!.replace(/[\r\n]/gm, '');
  } catch (error) {
    throw new ServerError('The server failed to send a request to OpenAI.', 500);
  }
};

export default openAICreateName;
