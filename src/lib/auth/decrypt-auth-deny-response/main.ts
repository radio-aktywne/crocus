import "server-only";

import { decrypt } from "../../crypto/decrypt";
import { SchemaValidationError } from "./errors";
import { authDenyResponseSchema } from "./schemas";
import {
  DecryptAuthDenyResponseInput,
  DecryptAuthDenyResponseOutput,
} from "./types";

export async function decryptAuthDenyResponse({
  data,
}: DecryptAuthDenyResponseInput): Promise<DecryptAuthDenyResponseOutput> {
  const { data: decrypted } = await decrypt({ data: data });
  const { data: parsed, error } = authDenyResponseSchema.safeParse(decrypted);
  if (error) throw new SchemaValidationError();
  return { challenge: parsed.challenge, error: parsed.error };
}
