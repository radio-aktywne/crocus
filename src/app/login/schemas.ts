import { z } from "zod";

export const searchParamsSchema = z.object({
  login_challenge: z.string(),
});
