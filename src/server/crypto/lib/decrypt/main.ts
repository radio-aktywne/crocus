import { jwtDecrypt } from "jose";
import { JOSEError } from "jose/errors";
import { createSecretKey } from "node:crypto";

import type { DecryptInput, DecryptOutput } from "./types";

import { state } from "../../../state/vars/state";
import { constants } from "../../constants";
import { DecryptionError } from "../../errors";

export async function decrypt({ data }: DecryptInput): Promise<DecryptOutput> {
  const key = createSecretKey(
    state.current.config.secrets.shared,
    constants.keyEncoding,
  );

  const { payload: decrypted } = await (async () => {
    try {
      return await jwtDecrypt(data, key, {
        contentEncryptionAlgorithms: [constants.contentEncryptionAlgorithm],
        keyManagementAlgorithms: [constants.keyManagementAlgorithm],
      });
    } catch (error) {
      if (error instanceof JOSEError)
        throw new DecryptionError("Decryption failed", { cause: error });

      throw error;
    }
  })();

  return { data: decrypted };
}
