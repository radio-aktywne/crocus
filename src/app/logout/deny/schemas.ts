import { z } from "zod";

export const searchParamsSchema = z.object({
  token: z.string(),
});
