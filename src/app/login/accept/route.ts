import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { createErrorPath } from "../../../lib/urls/create-error-path";
import { parseQueryParams } from "../../../lib/urls/parse-query-params";
import { errors, sessionAge } from "./constants";
import { searchParamsSchema } from "./schemas";
import {
  getDurationInSeconds,
  safeAcceptLoginRequest,
  safeDecryptAuthLoginAcceptResponse,
  safeGetLoginRequest,
} from "./utils";

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

  const { challenge, subject, traits } =
    await safeDecryptAuthLoginAcceptResponse({
      data: token,
    });

  const { request: loginRequest } = await safeGetLoginRequest({
    challenge: challenge,
  });

  const { redirect: url } = await safeAcceptLoginRequest({
    challenge: loginRequest.challenge,
    context: {
      subject: subject,
      traits: traits,
    },
    extend_session_lifespan: loginRequest.skip ? true : undefined,
    remember: loginRequest.skip ? undefined : true,
    remember_for: loginRequest.skip
      ? undefined
      : getDurationInSeconds(sessionAge),
    subject: subject,
  });

  redirect(url);
}
