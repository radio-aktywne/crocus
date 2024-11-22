import "server-only";

import { scorpion } from "../../../../services/scorpion";
import { ScorpionError } from "../../errors";
import { RejectLogoutRequestInput } from "./types";

export async function rejectLogoutRequest({
  challenge,
}: RejectLogoutRequestInput): Promise<void> {
  const { error } = await scorpion.PUT(
    "/admin/oauth2/auth/requests/logout/reject",
    {
      params: {
        query: { logout_challenge: challenge },
      },
    },
  );

  if (error) throw new ScorpionError();
}
