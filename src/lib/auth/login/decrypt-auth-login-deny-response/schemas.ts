import { z } from "zod";

import { payloadTypes } from "../../constants";

export const authLoginDenyResponseSchema = z.object({
  challenge: z.string(),
  error: z.string().optional(),
  type: z.literal(payloadTypes.authLoginDenyResponse),
});
