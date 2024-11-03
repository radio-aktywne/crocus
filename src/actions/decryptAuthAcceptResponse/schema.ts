import { z } from "zod";

export const AuthAcceptResponseSchema = z.object({
  challenge: z.string(),
  subject: z.string(),
});
