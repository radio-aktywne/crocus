import * as z from "zod";

export const Schemas = {
  Path: undefined as never,
  Query: z.object({
    consent_challenge: z.string().catch(""),
  }),
};
