"use server";

import { encrypt } from "../../utils/crypto";
import { EncryptAuthDenyResponseProps } from "./types";

const errorMessage = "Encrypting auth deny response failed.";

export async function encryptAuthDenyResponse({
  challenge,
  error,
}: EncryptAuthDenyResponseProps) {
  try {
    const data = { challenge, error };
    const encrypted = await encrypt(data);

    return { data: encrypted, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}
