import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { acceptConsentRequest } from "../../lib/scorpion/consent/accept-consent-request";
import { ConsentRequestGoneError } from "../../lib/scorpion/consent/errors";
import { getConsentRequest } from "../../lib/scorpion/consent/get-consent-request";
import { ScorpionError } from "../../lib/scorpion/errors";
import { createErrorPath } from "../../lib/urls/create-error-path";
import { parseQueryParams } from "../../lib/urls/parse-query-params";
import { errors } from "./constants";
import { searchParamsSchema } from "./schemas";
import { createIdToken } from "./utils";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { data: params, error: paramsError } = parseQueryParams({
    params: request.nextUrl.searchParams,
    schema: searchParamsSchema,
  });

  if (paramsError) {
    const { path } = createErrorPath({
      description: errors.query.description,
      hint: errors.query.hint,
    });

    redirect(path);
  }

  const { consent_challenge: challenge } = params;

  try {
    const { request: consentRequest } = await getConsentRequest({
      challenge: challenge,
    });

    if (consentRequest.skip || consentRequest.client?.skip_consent) {
      const { redirect: url } = await acceptConsentRequest({
        challenge: consentRequest.challenge,
        grant_access_token_audience:
          consentRequest.requested_access_token_audience,
        grant_scope: consentRequest.requested_scope,
      });

      redirect(url);
    }

    const { redirect: url } = await acceptConsentRequest({
      challenge: consentRequest.challenge,
      grant_access_token_audience:
        consentRequest.requested_access_token_audience,
      grant_scope: consentRequest.requested_scope,
      session: {
        id_token: createIdToken(consentRequest.context),
      },
    });

    redirect(url);
  } catch (error) {
    if (error instanceof ConsentRequestGoneError) redirect(error.redirect);

    if (error instanceof ScorpionError) {
      const { path } = createErrorPath({
        description: errors.system.description,
        hint: errors.system.hint,
      });

      redirect(path);
    }

    throw error;
  }
}
