import { redirect } from "next/navigation";

import dayjs from "../../../dayjs";
import {
  decryptAuthLoginAcceptResponse,
  SchemaValidationError,
} from "../../../lib/auth/login/decrypt-auth-login-accept-response";
import { acceptLoginRequest } from "../../../lib/scorpion/login/accept-login-request";
import { LoginRequestGoneError } from "../../../lib/scorpion/login/errors";
import { getLoginRequest } from "../../../lib/scorpion/login/get-login-request";
import { createErrorPath } from "../../../lib/urls/create-error-path";
import { errors } from "./constants";

export async function safeDecryptAuthLoginAcceptResponse(
  ...args: Parameters<typeof decryptAuthLoginAcceptResponse>
) {
  try {
    return await decryptAuthLoginAcceptResponse(...args);
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

export async function safeAcceptLoginRequest(
  ...args: Parameters<typeof acceptLoginRequest>
) {
  try {
    return await acceptLoginRequest(...args);
  } catch (error) {
    if (error instanceof LoginRequestGoneError) redirect(error.redirect);

    const { path } = createErrorPath({
      description: errors.system.description,
      hint: errors.system.hint,
    });

    redirect(path);
  }
}

export function getDurationInSeconds(duration: string) {
  return dayjs.duration(duration).asSeconds();
}
