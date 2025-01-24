import { redirect } from "next/navigation";

import {
  decryptAuthLoginDenyResponse,
  SchemaValidationError,
} from "../../../lib/auth/login/decrypt-auth-login-deny-response";
import { LoginRequestGoneError } from "../../../lib/scorpion/login/errors";
import { getLoginRequest } from "../../../lib/scorpion/login/get-login-request";
import { rejectLoginRequest } from "../../../lib/scorpion/login/reject-login-request";
import { createErrorPath } from "../../../lib/urls/create-error-path";
import { errors } from "./constants";

export async function safeDecryptAuthLoginDenyResponse(
  ...args: Parameters<typeof decryptAuthLoginDenyResponse>
) {
  try {
    return await decryptAuthLoginDenyResponse(...args);
  } catch (error) {
    if (error instanceof SchemaValidationError) {
      const { path } = createErrorPath({
        description: errors.token.description,
        hint: errors.token.hint,
      });

      redirect(path);
    }

    const { path } = createErrorPath({
      description: errors.system.description,
      hint: errors.system.hint,
    });

    redirect(path);
  }
}

export async function safeGetLoginRequest(
  ...args: Parameters<typeof getLoginRequest>
) {
  try {
    return await getLoginRequest(...args);
  } catch (error) {
    if (error instanceof LoginRequestGoneError) redirect(error.redirect);

    const { path } = createErrorPath({
      description: errors.system.description,
      hint: errors.system.hint,
    });

    redirect(path);
  }
}

export async function safeRejectLoginRequest(
  ...args: Parameters<typeof rejectLoginRequest>
) {
  try {
    return await rejectLoginRequest(...args);
  } catch (error) {
    if (error instanceof LoginRequestGoneError) redirect(error.redirect);

    const { path } = createErrorPath({
      description: errors.system.description,
      hint: errors.system.hint,
    });

    redirect(path);
  }
}
