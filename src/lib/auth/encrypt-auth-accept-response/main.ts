import "server-only";

import { encrypt } from "../../crypto/encrypt";
import { payloadTypes } from "../constants";
import {
  EncryptAuthAcceptResponseInput,
  EncryptAuthAcceptResponseOutput,
} from "./types";

export async function encryptAuthAcceptResponse({
  challenge,
  subject,
}: EncryptAuthAcceptResponseInput): Promise<EncryptAuthAcceptResponseOutput> {
  const data = {
    challenge: challenge,
    subject: subject,
    type: payloadTypes.authAcceptResponse,
  };
  const { data: encrypted } = await encrypt({ data: data });
  return { data: encrypted };
}
