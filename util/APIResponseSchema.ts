import { z } from 'zod';

const responseSchema = {
  message: z.string(),
  status: z.number(),
};
export const APISuccessResponseSchema = z.object({
  ...responseSchema,
  result: z.string(),
  success: z.literal(true),
});

export type SuccessResponse = z.infer<typeof APISuccessResponseSchema>;

export const APIErrorResponseSchema = z.object({
  ...responseSchema,
  success: z.literal(false),
});

export type ErrorResponse = z.infer<typeof APIErrorResponseSchema>;

export const APIGetSavedResultsSchema = z.object({
  ...responseSchema,
  success: z.literal(true),
  data: z.unknown(),
});

export type GetSavedResultsResponse = z.infer<typeof APIGetSavedResultsSchema>;

// create zod schema
export const ReviewResultZodSchema = z.object({
  input: z.object({
    keywords: z.array(z.string()),
    name: z.string(),
  }),
  result: z.string(),
  metadata: z.object({
    createdAt: z.union([z.string(), z.date()]),
    createdBy: z.string(),
  }),
  _id: z.unknown(),
});

export type ReviewResultT = z.infer<typeof ReviewResultZodSchema>;

// create zod schema
export const MenuResultZodSchema = z.object({
  input: z.object({
    cuisine: z.string(),
    name: z.string(),
  }),
  result: z.string(),
  metadata: z.object({
    createdAt: z.union([z.string(), z.date()]),
    createdBy: z.string(),
  }),
  _id: z.unknown(),
});

export type MenuResultT = z.infer<typeof MenuResultZodSchema>;

export const NameResultZodSchema = z.object({
  input: z.object({
    cuisine: z.string(),
    keywords: z.array(z.string()),
  }),
  result: z.string(),
  metadata: z.object({
    createdAt: z.union([z.string(), z.date()]),
    createdBy: z.string(),
  }),
  _id: z.unknown(),
});

export type NameResultT = z.infer<typeof NameResultZodSchema>;
