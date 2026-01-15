import * as z from "zod";

export const Schemas = {
  Path: undefined as never,
  Query: z.object({
    login_challenge: z.string().catch(""),
  }),
};
