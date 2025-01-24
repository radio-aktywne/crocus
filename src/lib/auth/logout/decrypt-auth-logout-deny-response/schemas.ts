import { z } from "zod";

import { payloadTypes } from "../../constants";

export const authLogoutDenyResponseSchema = z.object({
  challenge: z.string(),
  type: z.literal(payloadTypes.authLogoutDenyResponse),
});
