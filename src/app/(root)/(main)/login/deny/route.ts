import type { NextRequest } from "next/server";

import { redirect } from "next/navigation";
import { connection } from "next/server";

import type { RouteInput } from "../../../../types";
import type { Keys } from "./types";

import { AuthError } from "../../../../../server/auth/errors";
import { decryptLoginDenyResponse } from "../../../../../server/auth/lib/decrypt-login-deny-response";
import { createErrorUrl } from "../../../../../server/core/lib/flow/create-error-url";
import { state } from "../../../../../server/state/vars/state";
import { Schemas } from "./schemas";

export async function GET(request: NextRequest, {}: RouteInput<Keys.Path>) {
  await connection();

  const queryParameters = await Schemas.Query.parseAsync(
    Object.fromEntries(request.nextUrl.searchParams),
  );

  const { token } = queryParameters;

  const { challenge, error: errorHint } = await (async () => {
    try {
      return await decryptLoginDenyResponse({ data: token });
    } catch (error) {
      if (error instanceof AuthError) redirect(createErrorUrl());
      throw error;
    }
  })();

  const { loginRequest } = await (async () => {
    const { data, error } =
      await state.current.apis.scorpion.getOAuth2LoginRequest({
        query: {
          login_challenge: challenge,
        },
      });

    if (error && "redirect_to" in error) redirect(error.redirect_to);
    if (error) redirect(createErrorUrl());

    return { loginRequest: data };
  })();

  const { redirectUrl } = await (async () => {
    const { data, error } =
      await state.current.apis.scorpion.rejectOAuth2LoginRequest({
        body: {
          error_hint: errorHint,
        },
        query: {
          login_challenge: loginRequest.challenge,
        },
      });

    if (error) redirect(createErrorUrl());

    return { redirectUrl: data.redirect_to };
  })();

  redirect(redirectUrl);
}
