import { z } from "zod";

import { payloadTypes } from "../constants";

export const authRequestSchema = z.object({
  challenge: z.string(),
  type: z.literal(payloadTypes.authRequest),
});
