import type {
  EncryptLogoutRequestInput,
  EncryptLogoutRequestOutput,
} from "./types";

import { CryptoError } from "../../../crypto/errors";
import { encrypt } from "../../../crypto/lib/encrypt";
import { constants } from "../../constants";
import { EncryptionError } from "../../errors";

export async function encryptLogoutRequest({
  challenge,
}: EncryptLogoutRequestInput): Promise<EncryptLogoutRequestOutput> {
  const data = {
    challenge: challenge,
    type: constants.payloadTypes.logoutRequest,
  };

  const { data: encrypted } = await (async () => {
    try {
      return await encrypt({ data: data });
    } catch (error) {
      if (error instanceof CryptoError)
        throw new EncryptionError("Encryption failed", { cause: error });

      throw error;
    }
  })();

  return { data: encrypted };
}
