"use server";

import { scorpion } from "../../api";
import { RejectLogoutRequestProps } from "./types";

const errorMessage = "Rejecting logout request failed.";

export async function rejectLogoutRequest({
  challenge,
}: RejectLogoutRequestProps) {
  try {
    const { error, response } = await scorpion.PUT(
      "/admin/oauth2/auth/requests/logout/reject",
      {
        params: {
          query: { logout_challenge: challenge },
        },
      },
    );

    if (error || !response.ok) return { error: errorMessage };
    return { error: undefined };
  } catch (error) {
    return { error: errorMessage };
  }
}
