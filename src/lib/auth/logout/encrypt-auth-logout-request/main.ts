import "server-only";

import { encrypt } from "../../../crypto/encrypt";
import { payloadTypes } from "../../constants";
import {
  EncryptAuthLogoutRequestInput,
  EncryptAuthLogoutRequestOutput,
} from "./types";

export async function encryptAuthLogoutRequest({
  challenge,
}: EncryptAuthLogoutRequestInput): Promise<EncryptAuthLogoutRequestOutput> {
  const data = { challenge: challenge, type: payloadTypes.authLogoutRequest };
  const { data: encrypted } = await encrypt({ data: data });
  return { data: encrypted };
}
