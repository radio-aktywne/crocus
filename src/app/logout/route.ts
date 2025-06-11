import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { encryptAuthLogoutRequest } from "../../lib/auth/logout/encrypt-auth-logout-request";
import { createErrorPath } from "../../lib/urls/create-error-path";
import { createOrchidAuthLogoutURL } from "../../lib/urls/create-orchid-auth-logout-url";
import { parseQueryParams } from "../../lib/urls/parse-query-params";
import { errors } from "./constants";
import { searchParamsSchema } from "./schemas";
import { safeGetLogoutRequest } from "./utils";

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

  const { logout_challenge: challenge } = params;

  const { request: logoutRequest } = await safeGetLogoutRequest({
    challenge: challenge,
  });

  const { data: token } = await encryptAuthLogoutRequest({
    challenge: logoutRequest.challenge || challenge,
  });
  const { url } = createOrchidAuthLogoutURL({ token });
  redirect(url);
}
