import { z } from 'zod';

export const responseBodySchema = z.object({
  cuisine: z.string(),
  keywords: z.array(z.string()),
  location: z.string(),
});

export type ResponseBody = z.infer<typeof responseBodySchema>;
