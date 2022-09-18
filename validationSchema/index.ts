import { z } from 'zod';

export const nameGenResponseBodySchema = z.object({
  cuisine: z.string(),
  keywords: z.array(z.string()),
  location: z.string(),
});

export type NameGenResponseBody = z.infer<typeof nameGenResponseBodySchema>;

export const reviewGenResponseBodySchema = z.object({
  keywords: z.array(z.string()),
  name: z.string(),
});

export type ReviewGenResponseBody = z.infer<typeof reviewGenResponseBodySchema>;
