import "server-only";

import { decrypt } from "../../../crypto/decrypt";
import { SchemaValidationError } from "./errors";
import { authLogoutDenyResponseSchema } from "./schemas";
import {
  DecryptAuthLogoutDenyResponseInput,
  DecryptAuthLogoutDenyResponseOutput,
} from "./types";

export async function decryptAuthLogoutDenyResponse({
  data,
}: DecryptAuthLogoutDenyResponseInput): Promise<DecryptAuthLogoutDenyResponseOutput> {
  const { data: decrypted } = await decrypt({ data: data });
  const { data: parsed, error } =
    authLogoutDenyResponseSchema.safeParse(decrypted);
  if (error) throw new SchemaValidationError();
  return { challenge: parsed.challenge };
}
