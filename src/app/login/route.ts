import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { encryptAuthRequest } from "../../lib/auth/encrypt-auth-request";
import { ScorpionError } from "../../lib/scorpion/errors";
import { acceptLoginRequest } from "../../lib/scorpion/login/accept-login-request";
import { LoginRequestGoneError } from "../../lib/scorpion/login/errors";
import { getLoginRequest } from "../../lib/scorpion/login/get-login-request";
import { createErrorPath } from "../../lib/urls/create-error-path";
import { createLoginAuthPath } from "../../lib/urls/create-login-auth-path";
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

  const { login_challenge: challenge } = params;

  try {
    const { request: loginRequest } = await getLoginRequest({
      challenge: challenge,
    });

    if (loginRequest.skip) {
      const { redirect: url } = await acceptLoginRequest({
        challenge: loginRequest.challenge,
        subject: loginRequest.subject,
      });

      redirect(url);
    }

    const { data: token } = await encryptAuthRequest({
      challenge: loginRequest.challenge,
    });

    const { path } = createLoginAuthPath({ token: token });

    redirect(path);
  } catch (error) {
    if (error instanceof LoginRequestGoneError) redirect(error.redirect);

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
