"use server";

import { scorpion } from "../../api";
import { GetConsentRequestProps } from "./types";

const errorMessage = "Getting consent request failed.";

export async function getConsentRequest({ challenge }: GetConsentRequestProps) {
  try {
    const { data, error, response } = await scorpion.GET(
      "/admin/oauth2/auth/requests/consent",
      {
        params: {
          query: { consent_challenge: challenge },
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
