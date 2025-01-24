import "server-only";

import { decrypt } from "../../../crypto/decrypt";
import { SchemaValidationError } from "./errors";
import { authLoginDenyResponseSchema } from "./schemas";
import {
  DecryptAuthLoginDenyResponseInput,
  DecryptAuthLoginDenyResponseOutput,
} from "./types";

export async function decryptAuthLoginDenyResponse({
  data,
}: DecryptAuthLoginDenyResponseInput): Promise<DecryptAuthLoginDenyResponseOutput> {
  const { data: decrypted } = await decrypt({ data: data });
  const { data: parsed, error } =
    authLoginDenyResponseSchema.safeParse(decrypted);
  if (error) throw new SchemaValidationError();
  return { challenge: parsed.challenge, error: parsed.error };
}
