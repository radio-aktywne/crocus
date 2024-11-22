import "server-only";

import { encrypt } from "../../crypto/encrypt";
import { payloadTypes } from "../constants";
import {
  EncryptAuthDenyResponseInput,
  EncryptAuthDenyResponseOutput,
} from "./types";

export async function encryptAuthDenyResponse({
  challenge,
  error,
}: EncryptAuthDenyResponseInput): Promise<EncryptAuthDenyResponseOutput> {
  const data = {
    challenge: challenge,
    error: error,
    type: payloadTypes.authDenyResponse,
  };
  const { data: encrypted } = await encrypt({ data: data });
  return { data: encrypted };
}
