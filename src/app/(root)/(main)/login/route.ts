import type { NextRequest } from "next/server";

import { redirect } from "next/navigation";
import { connection } from "next/server";

import type { RouteInput } from "../../../types";
import type { Keys } from "./types";

import { encryptLoginRequest } from "../../../../server/auth/lib/encrypt-login-request";
import { createErrorUrl } from "../../../../server/core/lib/flow/create-error-url";
import { state } from "../../../../server/state/vars/state";
import { Schemas } from "./schemas";
import { createLoginUrl } from "./utils";

export async function GET(request: NextRequest, {}: RouteInput<Keys.Path>) {
  await connection();

  const queryParameters = await Schemas.Query.parseAsync(
    Object.fromEntries(request.nextUrl.searchParams),
  );

  const { login_challenge: loginChallenge } = queryParameters;

  const { loginRequest } = await (async () => {
    const { data, error } =
      await state.current.apis.scorpion.getOAuth2LoginRequest({
        query: {
          login_challenge: loginChallenge,
        },
      });

    if (error && "redirect_to" in error) redirect(error.redirect_to);
    if (error) redirect(createErrorUrl());

    return { loginRequest: data };
  })();

  const { data: token } = await encryptLoginRequest({
    challenge: loginRequest.challenge,
  });

  redirect(createLoginUrl(token));
}
