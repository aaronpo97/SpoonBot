import fs from 'fs/promises';
import { stringify } from 'flatted';
import openai from '../config/openai';
import ServerError from '../util/error/ServerError';
import { ReviewGenRequestBody } from '../util/RequestSchemas';

const generatePrompt = ({ keywords, name }: ReviewGenRequestBody) => {
  const prompt = `You are a restaurant review bot. Please write a long restaurant review based on this information.
  
  name: ${name}
  keywords: ${keywords}
  `;
  return prompt;
};

const openAICreateReview = async ({ keywords, name }: ReviewGenRequestBody) => {
  try {
    const prompt = generatePrompt({
      name,
      keywords,
    });
    const result = await openai.createCompletion({
      model: 'text-curie-001',
      prompt,
      max_tokens: 200,
    });

    return result.data.choices![0].text!.replace(/[\r\n]/gm, '');
  } catch (error) {
    throw new ServerError('The server failed to send a request to OpenAI.', 500);
  }
};

export default openAICreateReview;
