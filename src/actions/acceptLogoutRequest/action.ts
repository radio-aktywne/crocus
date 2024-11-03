"use server";

import { scorpion } from "../../api";
import { AcceptLogoutRequestProps } from "./types";

const errorMessage = "Accepting logout request failed.";

export async function acceptLogoutRequest({
  challenge,
}: AcceptLogoutRequestProps) {
  try {
    const { data, error, response } = await scorpion.PUT(
      "/admin/oauth2/auth/requests/logout/accept",
      {
        params: {
          query: { logout_challenge: challenge },
        },
      },
    );

    if (error || !response.ok) return { data: undefined, error: errorMessage };
    return { data, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}
