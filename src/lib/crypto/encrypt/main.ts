import { EncryptJWT } from "jose";
import "server-only";

import {
  contentEncryptionAlgorithm,
  keyManagementAlgorithm,
} from "../constants";
import { getSecretKey } from "../utils";
import { EncryptInput, EncryptOutput } from "./types";

export async function encrypt({ data }: EncryptInput): Promise<EncryptOutput> {
  const key = getSecretKey();

  const jwt = new EncryptJWT(data).setProtectedHeader({
    alg: keyManagementAlgorithm,
    enc: contentEncryptionAlgorithm,
  });
  const encrypted = await jwt.encrypt(key);

  return { data: encrypted };
}
