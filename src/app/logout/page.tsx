import { redirect } from "next/navigation";
import { acceptLogoutRequest, getLogoutRequest } from "../../actions";

export type LogoutPageSearchParams = Readonly<{
  logout_challenge?: string;
}>;

export type LogoutPageProps = Readonly<{
  searchParams: LogoutPageSearchParams;
}>;

export const dynamic = "force-dynamic";

export default async function LogoutPage({ searchParams }: LogoutPageProps) {
  const { logout_challenge: challenge } = searchParams;

  if (!challenge) throw new Error("Missing logout_challenge query parameter.");

  const { data: logoutRequest, error: getLogoutRequestError } =
    await getLogoutRequest({ challenge });

  if (getLogoutRequestError !== undefined) {
    if (getLogoutRequestError instanceof Object)
      redirect(getLogoutRequestError.redirect_to);
    throw new Error(getLogoutRequestError);
  }

  const { data: acceptLogoutResponse, error: acceptLogoutRequestError } =
    await acceptLogoutRequest({
      challenge: logoutRequest.challenge || challenge,
    });

  if (acceptLogoutRequestError !== undefined)
    throw new Error(acceptLogoutRequestError);
  redirect(acceptLogoutResponse.redirect_to);
}
