import axios from 'axios';

import moderationResponseSchema from '../util/ModerationResponseSchema';

export class ModerationError extends Error {
  message = 'SpoonBot has declined your request as it is not appropriate.';

  reason: string;

  constructor(reason: string) {
    super();
    this.reason = reason;
  }
}

const openAICreateModeration = async (prompt: string) => {
  const { data: ResponseData } = await axios.post(
    'https://api.openai.com/v1/moderations',
    { input: prompt },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
    },
  );
  const moderationResponse = moderationResponseSchema.parse(ResponseData);

  return moderationResponse;
};

export default openAICreateModeration;
