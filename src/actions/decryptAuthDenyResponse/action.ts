"use server";

import { decrypt } from "../../utils/crypto";
import { AuthDenyResponseSchema } from "./schema";
import { DecryptAuthDenyResponseProps } from "./types";

const errorMessage = "Decrypting auth deny response failed.";

export async function decryptAuthDenyResponse({
  data,
}: DecryptAuthDenyResponseProps) {
  try {
    const decrypted = await decrypt(data);
    const parsed = AuthDenyResponseSchema.parse(decrypted);

    return { data: parsed, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}
