"use server";

import { scorpion } from "../../api";
import { GetLogoutRequestProps } from "./types";

const errorMessage = "Getting logout request failed.";

export async function getLogoutRequest({ challenge }: GetLogoutRequestProps) {
  try {
    const { data, error, response } = await scorpion.GET(
      "/admin/oauth2/auth/requests/logout",
      {
        params: {
          query: { logout_challenge: challenge },
        },
      },
    );

    if (error && "redirect_to" in error)
      return { data: undefined, error: error };
    if (error || !response.ok) return { data: undefined, error: errorMessage };
    return { data, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}
