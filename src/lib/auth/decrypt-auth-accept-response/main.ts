import "server-only";

import { decrypt } from "../../crypto/decrypt";
import { SchemaValidationError } from "./errors";
import { authAcceptResponseSchema } from "./schemas";
import {
  DecryptAuthAcceptResponseInput,
  DecryptAuthAcceptResponseOutput,
} from "./types";

export async function decryptAuthAcceptResponse({
  data,
}: DecryptAuthAcceptResponseInput): Promise<DecryptAuthAcceptResponseOutput> {
  const { data: decrypted } = await decrypt({ data: data });
  const { data: parsed, error } = authAcceptResponseSchema.safeParse(decrypted);
  if (error) throw new SchemaValidationError();
  return { challenge: parsed.challenge, subject: parsed.subject };
}
