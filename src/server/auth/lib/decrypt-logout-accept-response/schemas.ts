import * as z from "zod";

import { constants } from "../../constants";

export const Schemas = {
  Request: z.object({
    challenge: z.string(),
    type: z.literal(constants.payloadTypes.logoutAcceptResponse),
  }),
};
