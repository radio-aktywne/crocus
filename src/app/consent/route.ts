import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { createErrorPath } from "../../lib/urls/create-error-path";
import { parseQueryParams } from "../../lib/urls/parse-query-params";
import { errors, sessionAge } from "./constants";
import { searchParamsSchema } from "./schemas";
import {
  createIdToken,
  getDurationInSeconds,
  safeAcceptConsentRequest,
  safeGetConsentRequest,
} from "./utils";

export const dynamic = "force-dynamic";

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

  const { request: consentRequest } = await safeGetConsentRequest({
    challenge,
  });

  const { redirect: url } = await safeAcceptConsentRequest({
    challenge: consentRequest.challenge,
    grant_access_token_audience: consentRequest.requested_access_token_audience,
    grant_scope: consentRequest.requested_scope,
    remember: consentRequest.skip ? undefined : true,
    remember_for: consentRequest.skip
      ? undefined
      : getDurationInSeconds(sessionAge),
    session: {
      id_token: createIdToken(consentRequest.context),
    },
  });

  redirect(url);
}
