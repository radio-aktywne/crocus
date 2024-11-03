"use server";

import { scorpion } from "../../api";
import { RejectConsentRequestProps } from "./types";

const errorMessage = "Rejecting consent request failed.";

export async function rejectConsentRequest(props: RejectConsentRequestProps) {
  try {
    const { data, error, response } = await scorpion.PUT(
      "/admin/oauth2/auth/requests/consent/reject",
      {
        params: {
          query: { consent_challenge: props.challenge },
        },
        body: {
          error: props.error,
          error_debug: props.errorDebug,
          error_description: props.errorDescription,
          error_hint: props.errorHint,
          status_code: props.statusCode,
        },
      },
    );

    if (error || !response.ok) return { data: undefined, error: errorMessage };
    return { data, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}
