import "server-only";

import { encrypt } from "../../crypto/encrypt";
import { payloadTypes } from "../constants";
import { EncryptAuthRequestInput, EncryptAuthRequestOutput } from "./types";

export async function encryptAuthRequest({
  challenge,
}: EncryptAuthRequestInput): Promise<EncryptAuthRequestOutput> {
  const data = { challenge: challenge, type: payloadTypes.authRequest };
  const { data: encrypted } = await encrypt({ data: data });
  return { data: encrypted };
}
