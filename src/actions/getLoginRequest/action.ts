"use server";

import { scorpion } from "../../api";
import { GetLoginRequestProps } from "./types";

const errorMessage = "Getting login request failed.";

export async function getLoginRequest({ challenge }: GetLoginRequestProps) {
  try {
    const { data, error, response } = await scorpion.GET(
      "/admin/oauth2/auth/requests/login",
      {
        params: {
          query: { login_challenge: challenge },
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
