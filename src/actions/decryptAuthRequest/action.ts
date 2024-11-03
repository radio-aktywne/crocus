"use server";

import { decrypt } from "../../utils/crypto";
import { AuthRequestSchema } from "./schema";
import { DecryptAuthRequestProps } from "./types";

const errorMessage = "Decrypting auth request failed.";

export async function decryptAuthRequest({ data }: DecryptAuthRequestProps) {
  try {
    const decrypted = await decrypt(data);
    const parsed = AuthRequestSchema.parse(decrypted);

    return { data: parsed, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}
