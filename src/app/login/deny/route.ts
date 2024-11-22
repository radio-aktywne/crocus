import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import {
  decryptAuthDenyResponse,
  SchemaValidationError,
} from "../../../lib/auth/decrypt-auth-deny-response";
import { ScorpionError } from "../../../lib/scorpion/errors";
import { LoginRequestGoneError } from "../../../lib/scorpion/login/errors";
import { getLoginRequest } from "../../../lib/scorpion/login/get-login-request";
import { rejectLoginRequest } from "../../../lib/scorpion/login/reject-login-request";
import { createErrorPath } from "../../../lib/urls/create-error-path";
import { parseQueryParams } from "../../../lib/urls/parse-query-params";
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

  const { token } = params;

  try {
    const { challenge, error } = await decryptAuthDenyResponse({
      data: token,
    });

    const { request: loginRequest } = await getLoginRequest({
      challenge: challenge,
    });

    const { redirect: url } = await rejectLoginRequest({
      challenge: loginRequest.challenge,
      error_hint: error,
    });

    redirect(url);
  } catch (error) {
    if (error instanceof SchemaValidationError) {
      const { path } = createErrorPath({
        description: errors.token.description,
        hint: errors.token.hint,
      });

      redirect(path);
    }

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
