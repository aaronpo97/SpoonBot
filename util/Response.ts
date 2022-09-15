import { z } from "zod";

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
