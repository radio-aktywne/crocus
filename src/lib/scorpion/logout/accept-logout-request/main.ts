import "server-only";

import { scorpion } from "../../../../services/scorpion";
import { ScorpionError } from "../../errors";
import { AcceptLogoutRequestInput, AcceptLogoutRequestOutput } from "./types";

export async function acceptLogoutRequest({
  challenge,
}: AcceptLogoutRequestInput): Promise<AcceptLogoutRequestOutput> {
  const { data, error } = await scorpion.PUT(
    "/admin/oauth2/auth/requests/logout/accept",
    {
      params: {
        query: { logout_challenge: challenge },
      },
    },
  );

  if (error) throw new ScorpionError();

  return { redirect: data.redirect_to };
}
