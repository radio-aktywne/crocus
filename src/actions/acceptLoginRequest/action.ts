"use server";

import { scorpion } from "../../api";
import { AcceptLoginRequestProps } from "./types";

const errorMessage = "Accepting login request failed.";

export async function acceptLoginRequest({
  challenge,
  subject,
  acr,
  amr,
  context,
  extendSessionLifespan,
  identityProviderSessionID,
  remember,
  rememberFor,
}: AcceptLoginRequestProps) {
  try {
    const { data, error, response } = await scorpion.PUT(
      "/admin/oauth2/auth/requests/login/accept",
      {
        params: {
          query: { login_challenge: challenge },
        },
        body: {
          subject: subject,
          acr: acr,
          amr: amr,
          context: context,
          extend_session_lifespan: extendSessionLifespan,
          identity_provider_session_id: identityProviderSessionID,
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
