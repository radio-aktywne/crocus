import * as z from "zod";

export const Schemas = {
  Path: undefined as never,
  Query: z.object({
    error: z.string().optional().catch(undefined),
    error_debug: z.string().optional().catch(undefined),
    error_description: z.string().optional().catch(undefined),
    error_hint: z.string().optional().catch(undefined),
  }),
};
