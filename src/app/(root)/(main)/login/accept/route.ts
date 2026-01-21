import type { NextRequest } from "next/server";

import { redirect } from "next/navigation";
import { connection } from "next/server";

import type { RouteInput } from "../../../../types";
import type { Keys } from "./types";

import { AuthError } from "../../../../../server/auth/errors";
import { decryptLoginAcceptResponse } from "../../../../../server/auth/lib/decrypt-login-accept-response";
import { createErrorUrl } from "../../../../../server/core/lib/flow/create-error-url";
import { state } from "../../../../../server/state/vars/state";
import { constants } from "./constants";
import { Schemas } from "./schemas";

export async function GET(request: NextRequest, {}: RouteInput<Keys.Path>) {
  await connection();

  const queryParameters = await Schemas.Query.parseAsync(
    Object.fromEntries(request.nextUrl.searchParams),
  );

  const { token } = queryParameters;

  const { challenge, subject, traits } = await (async () => {
    try {
      return await decryptLoginAcceptResponse({ data: token });
    } catch (error) {
      if (error instanceof AuthError) redirect(createErrorUrl().url);
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
    if (error) redirect(createErrorUrl().url);

    return { loginRequest: data };
  })();

  const { redirectUrl } = await (async () => {
    const { data, error } =
      await state.current.apis.scorpion.acceptOAuth2LoginRequest({
        body: {
          context: {
            subject: subject,
            traits: traits,
          },
          extend_session_lifespan: loginRequest.skip ? true : undefined,
          remember: loginRequest.skip ? undefined : true,
          remember_for: loginRequest.skip
            ? undefined
            : constants.sessionAge.asSeconds(),
          subject: subject,
        },
        query: {
          login_challenge: loginRequest.challenge,
        },
      });

    if (error) redirect(createErrorUrl().url);

    return { redirectUrl: data.redirect_to };
  })();

  redirect(redirectUrl);
}
