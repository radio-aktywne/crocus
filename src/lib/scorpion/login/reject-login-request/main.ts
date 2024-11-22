import "server-only";

import { scorpion } from "../../../../services/scorpion";
import { ScorpionError } from "../../errors";
import { RejectLoginRequestInput, RejectLoginRequestOutput } from "./types";

export async function rejectLoginRequest({
  challenge,
  ...body
}: RejectLoginRequestInput): Promise<RejectLoginRequestOutput> {
  const { data, error } = await scorpion.PUT(
    "/admin/oauth2/auth/requests/login/reject",
    {
      body: body,
      params: {
        query: { login_challenge: challenge },
      },
    },
  );

  if (error) throw new ScorpionError();

  return { redirect: data.redirect_to };
}
