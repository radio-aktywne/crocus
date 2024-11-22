import { z } from "zod";

export const searchParamsSchema = z.object({
  error: z.string().optional(),
  error_debug: z.string().optional(),
  error_description: z.string().optional(),
  error_hint: z.string().optional(),
});
