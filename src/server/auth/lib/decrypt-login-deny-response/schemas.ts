import * as z from "zod";

import { constants } from "../../constants";

export const Schemas = {
  Request: z.object({
    challenge: z.string(),
    error: z.string().optional(),
    type: z.literal(constants.payloadTypes.loginDenyResponse),
  }),
};
