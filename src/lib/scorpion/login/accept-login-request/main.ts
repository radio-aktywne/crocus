import "server-only";

import { scorpion } from "../../../../services/scorpion";
import { ScorpionError } from "../../errors";
import { AcceptLoginRequestInput, AcceptLoginRequestOutput } from "./types";

export async function acceptLoginRequest({
  challenge,
  ...body
}: AcceptLoginRequestInput): Promise<AcceptLoginRequestOutput> {
  const { data, error } = await scorpion.PUT(
    "/admin/oauth2/auth/requests/login/accept",
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
