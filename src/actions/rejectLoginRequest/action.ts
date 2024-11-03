"use server";

import { scorpion } from "../../api";
import { RejectLoginRequestProps } from "./types";

const errorMessage = "Rejecting login request failed.";

export async function rejectLoginRequest(props: RejectLoginRequestProps) {
  try {
    const { data, error, response } = await scorpion.PUT(
      "/admin/oauth2/auth/requests/login/reject",
      {
        params: {
          query: { login_challenge: props.challenge },
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
