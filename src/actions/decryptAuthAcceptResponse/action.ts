"use server";

import { decrypt } from "../../utils/crypto";
import { AuthAcceptResponseSchema } from "./schema";
import { DecryptAuthAcceptResponseProps } from "./types";

const errorMessage = "Decrypting auth accept response failed.";

export async function decryptAuthAcceptResponse({
  data,
}: DecryptAuthAcceptResponseProps) {
  try {
    const decrypted = await decrypt(data);
    const parsed = AuthAcceptResponseSchema.parse(decrypted);

    return { data: parsed, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}
