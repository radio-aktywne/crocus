import { EncryptJWT } from "jose";
import { JOSEError } from "jose/errors";
import { createSecretKey } from "node:crypto";

import type { EncryptInput, EncryptOutput } from "./types";

import { state } from "../../../state/vars/state";
import { constants } from "../../constants";
import { EncryptionError } from "../../errors";

export async function encrypt({ data }: EncryptInput): Promise<EncryptOutput> {
  const key = createSecretKey(
    state.current.config.secrets.shared,
    constants.keyEncoding,
  );

  const encrypted = await (async () => {
    try {
      const jwt = new EncryptJWT(data).setProtectedHeader({
        alg: constants.keyManagementAlgorithm,
        enc: constants.contentEncryptionAlgorithm,
      });

      return await jwt.encrypt(key);
    } catch (error) {
      if (error instanceof JOSEError)
        throw new EncryptionError("Encryption failed", { cause: error });

      throw error;
    }
  })();

  return { data: encrypted };
}
