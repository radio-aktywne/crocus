import "server-only";

import { scorpion } from "../../../../services/scorpion";
import { ScorpionError } from "../../errors";
import { AcceptConsentRequestInput, AcceptConsentRequestOutput } from "./types";

export async function acceptConsentRequest({
  challenge,
  ...body
}: AcceptConsentRequestInput): Promise<AcceptConsentRequestOutput> {
  const { data, error } = await scorpion.PUT(
    "/admin/oauth2/auth/requests/consent/accept",
    {
      body: body,
      params: {
        query: { consent_challenge: challenge },
      },
    },
  );

  if (error) throw new ScorpionError();

  return { redirect: data.redirect_to };
}
