import type { CreateIdTokenInput, CreateIdTokenOutput } from "./types";

import { Schemas } from "./schemas";

export async function createIdToken({
  context,
}: CreateIdTokenInput): Promise<CreateIdTokenOutput> {
  const ctx = await Schemas.Context.parseAsync(context);

  const token = {
    sub: ctx.subject,
    traits: ctx.traits,
  };

  return { token: token };
}
