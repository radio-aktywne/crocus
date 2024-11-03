"use server";

import { encrypt } from "../../utils/crypto";
import { EncryptAuthAcceptResponseProps } from "./types";

const errorMessage = "Encrypting auth accept response failed.";

export async function encryptAuthAcceptResponse({
  challenge,
  subject,
}: EncryptAuthAcceptResponseProps) {
  try {
    const data = { challenge, subject };
    const encrypted = await encrypt(data);

    return { data: encrypted, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}
