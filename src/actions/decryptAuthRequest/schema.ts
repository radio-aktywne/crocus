import { z } from "zod";

export const AuthRequestSchema = z.object({
  challenge: z.string(),
});
