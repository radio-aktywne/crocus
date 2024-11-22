import { jwtDecrypt } from "jose";
import "server-only";

import {
  contentEncryptionAlgorithm,
  keyManagementAlgorithm,
} from "../constants";
import { getSecretKey } from "../utils";
import { DecryptInput, DecryptOutput } from "./types";

export async function decrypt({ data }: DecryptInput): Promise<DecryptOutput> {
  const key = getSecretKey();

  const { payload: decrypted } = await jwtDecrypt(data, key, {
    contentEncryptionAlgorithms: [contentEncryptionAlgorithm],
    keyManagementAlgorithms: [keyManagementAlgorithm],
  });

  return { data: decrypted };
}
