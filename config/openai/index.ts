import OpenAi from 'openai';

const openAIClient = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openAIClient;
