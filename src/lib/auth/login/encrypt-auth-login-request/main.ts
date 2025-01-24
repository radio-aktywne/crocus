import "server-only";

import { encrypt } from "../../../crypto/encrypt";
import { payloadTypes } from "../../constants";
import {
  EncryptAuthLoginRequestInput,
  EncryptAuthLoginRequestOutput,
} from "./types";

export async function encryptAuthLoginRequest({
  challenge,
}: EncryptAuthLoginRequestInput): Promise<EncryptAuthLoginRequestOutput> {
  const data = { challenge: challenge, type: payloadTypes.authLoginRequest };
  const { data: encrypted } = await encrypt({ data: data });
  return { data: encrypted };
}
