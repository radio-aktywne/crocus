import type { NextRequest } from "next/server";

import { redirect } from "next/navigation";
import { connection } from "next/server";

import type { RouteInput } from "../../../../types";
import type { Keys } from "./types";

import { AuthError } from "../../../../../server/auth/errors";
import { decryptLogoutDenyResponse } from "../../../../../server/auth/lib/decrypt-logout-deny-response";
import { createDefaultUrl } from "../../../../../server/core/lib/flow/create-default-url";
import { createErrorUrl } from "../../../../../server/core/lib/flow/create-error-url";
import { state } from "../../../../../server/state/vars/state";
import { Schemas } from "./schemas";

export async function GET(request: NextRequest, {}: RouteInput<Keys.Path>) {
  await connection();

  const queryParameters = await Schemas.Query.parseAsync(
    Object.fromEntries(request.nextUrl.searchParams),
  );

  const { token } = queryParameters;

  const { challenge } = await (async () => {
    try {
      return await decryptLogoutDenyResponse({ data: token });
    } catch (error) {
      if (error instanceof AuthError) redirect(createErrorUrl());
      throw error;
    }
  })();

  const { logoutRequest } = await (async () => {
    const { data, error } =
      await state.current.apis.scorpion.getOAuth2LogoutRequest({
        query: {
          logout_challenge: challenge,
        },
      });

    if (error && "redirect_to" in error) redirect(error.redirect_to);
    if (error) redirect(createErrorUrl());

    return { logoutRequest: data };
  })();

  await (async () => {
    const { error } =
      await state.current.apis.scorpion.rejectOAuth2LogoutRequest({
        query: {
          logout_challenge: logoutRequest.challenge || challenge,
        },
      });

    if (error) redirect(createErrorUrl());
  })();

  redirect(createDefaultUrl());
}
