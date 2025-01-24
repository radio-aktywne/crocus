import { redirect } from "next/navigation";

import {
  decryptAuthLogoutDenyResponse,
  SchemaValidationError,
} from "../../../lib/auth/logout/decrypt-auth-logout-deny-response";
import { LogoutRequestGoneError } from "../../../lib/scorpion/logout/errors";
import { getLogoutRequest } from "../../../lib/scorpion/logout/get-logout-request";
import { rejectLogoutRequest } from "../../../lib/scorpion/logout/reject-logout-request";
import { createErrorPath } from "../../../lib/urls/create-error-path";
import { errors } from "./constants";

export async function safeDecryptAuthLogoutDenyResponse(
  ...args: Parameters<typeof decryptAuthLogoutDenyResponse>
) {
  try {
    return await decryptAuthLogoutDenyResponse(...args);
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

export async function safeGetLogoutRequest(
  ...args: Parameters<typeof getLogoutRequest>
) {
  try {
    return await getLogoutRequest(...args);
  } catch (error) {
    if (error instanceof LogoutRequestGoneError) redirect(error.redirect);

    const { path } = createErrorPath({
      description: errors.system.description,
      hint: errors.system.hint,
    });

    redirect(path);
  }
}

export async function safeRejectLogoutRequest(
  ...args: Parameters<typeof rejectLogoutRequest>
) {
  try {
    return await rejectLogoutRequest(...args);
  } catch (error) {
    if (error instanceof LogoutRequestGoneError) redirect(error.redirect);

    const { path } = createErrorPath({
      description: errors.system.description,
      hint: errors.system.hint,
    });

    redirect(path);
  }
}
