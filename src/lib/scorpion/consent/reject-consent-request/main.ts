import "server-only";

import { scorpion } from "../../../../services/scorpion";
import { ScorpionError } from "../../errors";
import { RejectConsentRequestInput, RejectConsentRequestOutput } from "./types";

export async function rejectConsentRequest({
  challenge,
  ...body
}: RejectConsentRequestInput): Promise<RejectConsentRequestOutput> {
  const { data, error } = await scorpion.PUT(
    "/admin/oauth2/auth/requests/consent/reject",
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
