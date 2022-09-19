import { z } from 'zod';

const moderationResponseSchema = z.object({
  id: z.string(),
  model: z.string(),
  results: z.array(
    z.object({
      categories: z.object({
        hate: z.boolean(),
        'hate/threatening': z.boolean(),
        'self-harm': z.boolean(),
        sexual: z.boolean(),
        'sexual/minors': z.boolean(),
        violence: z.boolean(),
        'violence/graphic': z.boolean(),
      }),
      category_scores: z.object({
        hate: z.number(),
        'hate/threatening': z.number(),
        'self-harm': z.number(),
        sexual: z.number(),
        'sexual/minors': z.number(),
        violence: z.number(),
        'violence/graphic': z.number(),
      }),
      flagged: z.boolean(),
    }),
  ),
});

export default moderationResponseSchema;
