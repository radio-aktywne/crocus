import { z } from "zod";

import { payloadTypes } from "../../constants";

export const authLogoutAcceptResponseSchema = z.object({
  challenge: z.string(),
  type: z.literal(payloadTypes.authLogoutAcceptResponse),
});
