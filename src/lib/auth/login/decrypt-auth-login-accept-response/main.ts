import "server-only";

import { decrypt } from "../../../crypto/decrypt";
import { SchemaValidationError } from "./errors";
import { authLoginAcceptResponseSchema } from "./schemas";
import {
  DecryptAuthLoginAcceptResponseInput,
  DecryptAuthLoginAcceptResponseOutput,
} from "./types";

export async function decryptAuthLoginAcceptResponse({
  data,
}: DecryptAuthLoginAcceptResponseInput): Promise<DecryptAuthLoginAcceptResponseOutput> {
  const { data: decrypted } = await decrypt({ data: data });
  const { data: parsed, error } =
    authLoginAcceptResponseSchema.safeParse(decrypted);
  if (error) throw new SchemaValidationError();
  return {
    challenge: parsed.challenge,
    subject: parsed.subject,
    traits: parsed.traits,
  };
}
