import "server-only";

import { scorpion } from "../../../../services/scorpion";
import { ScorpionError } from "../../errors";
import { ConsentRequestGoneError } from "../errors";
import { GetConsentRequestInput, GetConsentRequestOutput } from "./types";

export async function getConsentRequest({
  challenge,
}: GetConsentRequestInput): Promise<GetConsentRequestOutput> {
  const { data, error, response } = await scorpion.GET(
    "/admin/oauth2/auth/requests/consent",
    {
      cache: "no-store",
      params: {
        query: { consent_challenge: challenge },
      },
    },
  );

  if (error) {
    if (response.status === 410 && "redirect_to" in error)
      throw new ConsentRequestGoneError(error.redirect_to);
    throw new ScorpionError();
  }

  return { request: data };
}
