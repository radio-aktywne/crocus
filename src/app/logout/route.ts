import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { ScorpionError } from "../../lib/scorpion/errors";
import { acceptLogoutRequest } from "../../lib/scorpion/logout/accept-logout-request";
import { LogoutRequestGoneError } from "../../lib/scorpion/logout/errors";
import { getLogoutRequest } from "../../lib/scorpion/logout/get-logout-request";
import { createErrorPath } from "../../lib/urls/create-error-path";
import { parseQueryParams } from "../../lib/urls/parse-query-params";
import { errors } from "./constants";
import { searchParamsSchema } from "./schemas";

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

  try {
    const { request: logoutRequest } = await getLogoutRequest({
      challenge: challenge,
    });

    const { redirect: url } = await acceptLogoutRequest({
      challenge: logoutRequest.challenge || challenge,
    });

    redirect(url);
  } catch (error) {
    if (error instanceof LogoutRequestGoneError) redirect(error.redirect);

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
