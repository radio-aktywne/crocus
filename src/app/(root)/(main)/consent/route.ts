import type { NextRequest } from "next/server";

import { redirect } from "next/navigation";
import { connection } from "next/server";

import type { RouteInput } from "../../../types";
import type { Keys } from "./types";

import { createErrorUrl } from "../../../../server/core/lib/flow/create-error-url";
import { createIdToken } from "../../../../server/core/lib/flow/create-id-token";
import { state } from "../../../../server/state/vars/state";
import { constants } from "./constants";
import { Schemas } from "./schemas";

export async function GET(request: NextRequest, {}: RouteInput<Keys.Path>) {
  await connection();

  const queryParameters = await Schemas.Query.parseAsync(
    Object.fromEntries(request.nextUrl.searchParams),
  );

  const { consent_challenge: consentChallenge } = queryParameters;

  const { consentRequest } = await (async () => {
    const { data, error } =
      await state.current.apis.scorpion.getOAuth2ConsentRequest({
        query: {
          consent_challenge: consentChallenge,
        },
      });

    if (error && "redirect_to" in error) redirect(error.redirect_to);
    if (error) redirect(createErrorUrl());

    return { consentRequest: data };
  })();

  const { token: idToken } = await createIdToken({
    context: consentRequest.context,
  });

  const { redirectUrl } = await (async () => {
    const { data, error } =
      await state.current.apis.scorpion.acceptOAuth2ConsentRequest({
        body: {
          grant_access_token_audience:
            consentRequest.requested_access_token_audience,
          grant_scope: consentRequest.requested_scope,
          remember: consentRequest.skip ? undefined : true,
          remember_for: consentRequest.skip
            ? undefined
            : constants.sessionAge.asSeconds(),
          session: {
            id_token: idToken,
          },
        },
        query: {
          consent_challenge: consentChallenge,
        },
      });

    if (error) redirect(createErrorUrl());

    return { redirectUrl: data.redirect_to };
  })();

  redirect(redirectUrl);
}
