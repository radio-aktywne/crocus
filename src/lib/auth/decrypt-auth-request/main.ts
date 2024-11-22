import "server-only";

import { decrypt } from "../../crypto/decrypt";
import { SchemaValidationError } from "./errors";
import { authRequestSchema } from "./schemas";
import { DecryptAuthRequestInput, DecryptAuthRequestOutput } from "./types";

export async function decryptAuthRequest({
  data,
}: DecryptAuthRequestInput): Promise<DecryptAuthRequestOutput> {
  const { data: decrypted } = await decrypt({ data: data });
  const { data: parsed, error } = authRequestSchema.safeParse(decrypted);
  if (error) throw new SchemaValidationError();
  return { challenge: parsed.challenge };
}
