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

  const { challenge, subject } = await safeDecryptAuthLoginAcceptResponse({
    data: token,
  });

  const { request: loginRequest } = await safeGetLoginRequest({
    challenge: challenge,
  });

  const { redirect: url } = await safeAcceptLoginRequest({
    challenge: loginRequest.challenge,
    context: {
      subject: subject,
    },
    remember: true,
    remember_for: getDurationInSeconds(sessionAge),
    subject: subject,
  });

  redirect(url);
}
