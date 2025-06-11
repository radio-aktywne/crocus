import "server-only";

import { scorpion } from "../../../../services/scorpion";
import { ScorpionError } from "../../errors";
import { LoginRequestGoneError } from "../errors";
import { GetLoginRequestInput, GetLoginRequestOutput } from "./types";

export async function getLoginRequest({
  challenge,
}: GetLoginRequestInput): Promise<GetLoginRequestOutput> {
  const { data, error, response } = await scorpion.GET(
    "/admin/oauth2/auth/requests/login",
    {
      cache: "no-store",
      params: {
        query: { login_challenge: challenge },
      },
    },
  );

  if (error) {
    if (response.status === 410 && "redirect_to" in error)
      throw new LoginRequestGoneError(error.redirect_to);
    throw new ScorpionError();
  }

  return { request: data };
}
