import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import {
  decryptAuthRequest,
  SchemaValidationError,
} from "../../../lib/auth/decrypt-auth-request";
import { encryptAuthAcceptResponse } from "../../../lib/auth/encrypt-auth-accept-response";
import { createErrorPath } from "../../../lib/urls/create-error-path";
import { createLoginAcceptPath } from "../../../lib/urls/create-login-accept-path";
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

  const { token: requestToken } = params;

  try {
    const { challenge } = await decryptAuthRequest({ data: requestToken });

    const { data: responseToken } = await encryptAuthAcceptResponse({
      challenge: challenge,
      subject: "test@example.com",
    });

    const { path } = createLoginAcceptPath({ token: responseToken });

    redirect(path);
  } catch (error) {
    if (error instanceof SchemaValidationError) {
      const { path } = createErrorPath({
        description: errors.token.description,
        hint: errors.token.hint,
      });

      redirect(path);
    }

    throw error;
  }
}
