import { z } from "zod";

export const searchParamsSchema = z.object({
  logout_challenge: z.string(),
});
