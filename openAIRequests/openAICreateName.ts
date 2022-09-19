import openai from '../config/openai';
import ServerError from '../util/error/ServerError';
import { NameGenRequestBody } from '../util/RequestSchemas';
import openAICreateModeration, { ModerationError } from './openAICreateModeration';

const generatePrompt = ({ keywords, cuisine, location }: NameGenRequestBody) => {
  const prompt = `
You are a restaurant name generating AI.

Using the information below, create a new name for a restaurant. The name should be as creative as possible.

keywords: ${keywords.join(', ')}
cuisine: ${cuisine}
location: ${location}

This restaurant is called:`;
  return prompt;
};

const openAICreateName = async ({ keywords, cuisine, location }: NameGenRequestBody) => {
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
    const data = result.data.choices![0].text!.replace(/[\r\n]/gm, '');
    const moderation = await openAICreateModeration(data);

    console.log(moderation);
    if (moderation.results[0].flagged) {
      throw new ModerationError('Spoon');
    }

    return data;
  } catch (error) {
    if (error instanceof ModerationError) {
      throw new ServerError(error.message, 400);
    }
    throw new ServerError('The server failed to send a request to OpenAI.', 500);
  }
};

export default openAICreateName;
