import { z } from "zod";

export const AuthDenyResponseSchema = z.object({
  challenge: z.string(),
  error: z.string().optional(),
});
