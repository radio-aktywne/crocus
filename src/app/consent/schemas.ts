import { z } from "zod";

export const searchParamsSchema = z.object({
  consent_challenge: z.string(),
});
