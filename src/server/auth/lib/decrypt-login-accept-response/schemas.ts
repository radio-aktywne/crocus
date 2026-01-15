import * as z from "zod";

import { constants } from "../../constants";

export const Schemas = {
  Request: z.object({
    challenge: z.string(),
    subject: z.string(),
    traits: z.unknown(),
    type: z.literal(constants.payloadTypes.loginAcceptResponse),
  }),
};
