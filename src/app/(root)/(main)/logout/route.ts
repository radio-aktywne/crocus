import type { NextRequest } from "next/server";

import { redirect } from "next/navigation";
import { connection } from "next/server";

import type { RouteInput } from "../../../types";
import type { Keys } from "./types";

import { encryptLogoutRequest } from "../../../../server/auth/lib/encrypt-logout-request";
import { createErrorUrl } from "../../../../server/core/lib/flow/create-error-url";
import { state } from "../../../../server/state/vars/state";
import { Schemas } from "./schemas";
import { createLogoutUrl } from "./utils";

export async function GET(request: NextRequest, {}: RouteInput<Keys.Path>) {
  await connection();

  const queryParameters = await Schemas.Query.parseAsync(
    Object.fromEntries(request.nextUrl.searchParams),
  );

  const { logout_challenge: logoutChallenge } = queryParameters;

  const { logoutRequest } = await (async () => {
    const { data, error } =
      await state.current.apis.scorpion.getOAuth2LogoutRequest({
        query: {
          logout_challenge: logoutChallenge,
        },
      });

    if (error && "redirect_to" in error) redirect(error.redirect_to);
    if (error) redirect(createErrorUrl().url);

    return { logoutRequest: data };
  })();

  const { data: token } = await encryptLogoutRequest({
    challenge: logoutRequest.challenge || logoutChallenge,
  });

  redirect(createLogoutUrl(token).url);
}
