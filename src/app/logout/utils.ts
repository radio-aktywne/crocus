import { redirect } from "next/navigation";

import { LogoutRequestGoneError } from "../../lib/scorpion/logout/errors";
import { getLogoutRequest } from "../../lib/scorpion/logout/get-logout-request";
import { createErrorPath } from "../../lib/urls/create-error-path";
import { errors } from "./constants";

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
