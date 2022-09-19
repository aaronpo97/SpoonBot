import { z } from 'zod';

export const NameGenRequestBodySchema = z.object({
  cuisine: z.string(),
  keywords: z.array(z.string()),
  location: z.string(),
});

export type NameGenRequestBody = z.infer<typeof NameGenRequestBodySchema>;

export const ReviewGenRequestBodySchema = z.object({
  keywords: z.array(z.string()),
  name: z.string(),
});

export type ReviewGenRequestBody = z.infer<typeof ReviewGenRequestBodySchema>;
