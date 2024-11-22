import { z } from "zod";

import { payloadTypes } from "../constants";

export const authDenyResponseSchema = z.object({
  challenge: z.string(),
  error: z.string().optional(),
  type: z.literal(payloadTypes.authDenyResponse),
});
