"use server";

import { scorpion } from "../../api";
import { AcceptConsentRequestProps } from "./types";

const errorMessage = "Accepting consent request failed.";

export async function acceptConsentRequest({
  challenge,
  accessToken,
  grantAudience,
  grantScope,
  idToken,
  context,
  handledAt,
  remember,
  rememberFor,
}: AcceptConsentRequestProps) {
  try {
    const { data, error, response } = await scorpion.PUT(
      "/admin/oauth2/auth/requests/consent/accept",
      {
        params: {
          query: { consent_challenge: challenge },
        },
        body: {
          session: {
            access_token: accessToken,
            id_token: idToken,
          },
          grant_access_token_audience: grantAudience,
          grant_scope: grantScope,
          context: context,
          handled_at: handledAt,
          remember: remember,
          remember_for: rememberFor,
        },
      },
    );

    if (error || !response.ok) return { data: undefined, error: errorMessage };
    return { data, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}
