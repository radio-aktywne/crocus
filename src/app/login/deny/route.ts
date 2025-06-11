import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { createErrorPath } from "../../../lib/urls/create-error-path";
import { parseQueryParams } from "../../../lib/urls/parse-query-params";
import { errors } from "./constants";
import { searchParamsSchema } from "./schemas";
import {
  safeDecryptAuthLoginDenyResponse,
  safeGetLoginRequest,
  safeRejectLoginRequest,
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

  const { token } = params;

  const { challenge, error } = await safeDecryptAuthLoginDenyResponse({
    data: token,
  });

  const { request: loginRequest } = await safeGetLoginRequest({
    challenge: challenge,
  });

  const { redirect: url } = await safeRejectLoginRequest({
    challenge: loginRequest.challenge,
    error_hint: error,
  });

  redirect(url);
}
