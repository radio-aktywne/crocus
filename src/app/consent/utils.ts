import { redirect } from "next/navigation";

import dayjs from "../../dayjs";
import { acceptConsentRequest } from "../../lib/scorpion/consent/accept-consent-request";
import { ConsentRequestGoneError } from "../../lib/scorpion/consent/errors";
import { getConsentRequest } from "../../lib/scorpion/consent/get-consent-request";
import { createErrorPath } from "../../lib/urls/create-error-path";
import { errors } from "./constants";

export async function safeGetConsentRequest(
  ...args: Parameters<typeof getConsentRequest>
) {
  try {
    return await getConsentRequest(...args);
  } catch (error) {
    if (error instanceof ConsentRequestGoneError) redirect(error.redirect);

    const { path } = createErrorPath({
      description: errors.system.description,
      hint: errors.system.hint,
    });

    redirect(path);
  }
}

export async function safeAcceptConsentRequest(
  ...args: Parameters<typeof acceptConsentRequest>
) {
  try {
    return await acceptConsentRequest(...args);
  } catch (error) {
    if (error instanceof ConsentRequestGoneError) redirect(error.redirect);

    const { path } = createErrorPath({
      description: errors.system.description,
      hint: errors.system.hint,
    });

    redirect(path);
  }
}

export function createIdToken(context: unknown) {
  const ctx = context instanceof Object ? context : {};
  return {
    sub:
      "subject" in ctx && typeof ctx.subject === "string"
        ? ctx.subject
        : undefined,
    traits: "traits" in ctx ? ctx.traits : undefined,
  };
}

export function getDurationInSeconds(duration: string) {
  return dayjs.duration(duration).asSeconds();
}
