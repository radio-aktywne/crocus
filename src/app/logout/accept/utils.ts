import { redirect } from "next/navigation";

import {
  decryptAuthLogoutAcceptResponse,
  SchemaValidationError,
} from "../../../lib/auth/logout/decrypt-auth-logout-accept-response";
import { acceptLogoutRequest } from "../../../lib/scorpion/logout/accept-logout-request";
import { LogoutRequestGoneError } from "../../../lib/scorpion/logout/errors";
import { getLogoutRequest } from "../../../lib/scorpion/logout/get-logout-request";
import { createErrorPath } from "../../../lib/urls/create-error-path";
import { errors } from "./constants";

export async function safeDecryptAuthLogoutAcceptResponse(
  ...args: Parameters<typeof decryptAuthLogoutAcceptResponse>
) {
  try {
    return await decryptAuthLogoutAcceptResponse(...args);
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

export async function safeAcceptLogoutRequest(
  ...args: Parameters<typeof acceptLogoutRequest>
) {
  try {
    return await acceptLogoutRequest(...args);
  } catch (error) {
    if (error instanceof LogoutRequestGoneError) redirect(error.redirect);

    const { path } = createErrorPath({
      description: errors.system.description,
      hint: errors.system.hint,
    });

    redirect(path);
  }
}
