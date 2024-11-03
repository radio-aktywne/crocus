"use server";

import { encrypt } from "../../utils/crypto";
import { EncryptAuthRequestProps } from "./types";

const errorMessage = "Encrypting auth request failed.";

export async function encryptAuthRequest({
  challenge,
}: EncryptAuthRequestProps) {
  try {
    const data = { challenge };
    const encrypted = await encrypt(data);

    return { data: encrypted, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}
