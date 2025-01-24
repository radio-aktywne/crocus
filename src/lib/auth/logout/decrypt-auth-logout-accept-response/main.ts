import "server-only";

import { decrypt } from "../../../crypto/decrypt";
import { SchemaValidationError } from "./errors";
import { authLogoutAcceptResponseSchema } from "./schemas";
import {
  DecryptAuthLogoutAcceptResponseInput,
  DecryptAuthLogoutAcceptResponseOutput,
} from "./types";

export async function decryptAuthLogoutAcceptResponse({
  data,
}: DecryptAuthLogoutAcceptResponseInput): Promise<DecryptAuthLogoutAcceptResponseOutput> {
  const { data: decrypted } = await decrypt({ data: data });
  const { data: parsed, error } =
    authLogoutAcceptResponseSchema.safeParse(decrypted);
  if (error) throw new SchemaValidationError();
  return { challenge: parsed.challenge };
}
