import axios from 'axios';

import moderationResponseSchema from '../util/ModerationResponseSchema';

const openAICreateModeration = async (prompt: string) => {
  const { data: ResponseData } = await axios.post(
    'https://api.openai.com/v1/moderations',
    { input: prompt },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    },
  );
  const moderationResponse = moderationResponseSchema.parse(ResponseData);

  return moderationResponse;
};

export default openAICreateModeration;
