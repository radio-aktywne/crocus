import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { encryptAuthLoginRequest } from "../../lib/auth/login/encrypt-auth-login-request";
import { createErrorPath } from "../../lib/urls/create-error-path";
import { createOrchidAuthLoginURL } from "../../lib/urls/create-orchid-auth-login-url";
import { parseQueryParams } from "../../lib/urls/parse-query-params";
import { errors } from "./constants";
import { searchParamsSchema } from "./schemas";
import { safeGetLoginRequest } from "./utils";

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

  const { login_challenge: challenge } = params;

  const { request: loginRequest } = await safeGetLoginRequest({
    challenge: challenge,
  });

  const { data: token } = await encryptAuthLoginRequest({
    challenge: loginRequest.challenge,
  });
  const { url } = createOrchidAuthLoginURL({ token });
  redirect(url);
}
