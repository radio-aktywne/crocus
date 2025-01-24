import { z } from "zod";

import { payloadTypes } from "../../constants";

export const authLoginAcceptResponseSchema = z.object({
  challenge: z.string(),
  subject: z.string(),
  type: z.literal(payloadTypes.authLoginAcceptResponse),
});
