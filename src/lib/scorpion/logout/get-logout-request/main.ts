import "server-only";

import { scorpion } from "../../../../services/scorpion";
import { ScorpionError } from "../../errors";
import { LogoutRequestGoneError } from "../errors";
import { GetLogoutRequestInput, GetLogoutRequestOutput } from "./types";

export async function getLogoutRequest({
  challenge,
}: GetLogoutRequestInput): Promise<GetLogoutRequestOutput> {
  const { data, error, response } = await scorpion.GET(
    "/admin/oauth2/auth/requests/logout",
    {
      params: {
        query: { logout_challenge: challenge },
      },
    },
  );

  if (error) {
    if (response.status === 410 && "redirect_to" in error)
      throw new LogoutRequestGoneError(error.redirect_to);
    throw new ScorpionError();
  }

  return { request: data };
}
