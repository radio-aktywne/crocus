import * as z from "zod";

export const Schemas = {
  Context: z
    .object({
      subject: z.string().optional().catch(undefined),
      traits: z.unknown().optional().catch(undefined),
    })
    .catch({}),
};
