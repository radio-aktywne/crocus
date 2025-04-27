import { z } from "zod";

import { payloadTypes } from "../../constants";

export const authLoginAcceptResponseSchema = z.object({
  challenge: z.string(),
  subject: z.string(),
  traits: z.unknown(),
  type: z.literal(payloadTypes.authLoginAcceptResponse),
});
