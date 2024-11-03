import { redirect } from "next/navigation";
import {
  decryptAuthDenyResponse,
  getLoginRequest,
  rejectLoginRequest,
} from "../../../actions";

export type LoginDenyPageSearchParams = Readonly<{
  token?: string;
}>;

export type LoginDenyPageProps = Readonly<{
  searchParams: LoginDenyPageSearchParams;
}>;

export const dynamic = "force-dynamic";

export default async function LoginDenyPage({
  searchParams,
}: LoginDenyPageProps) {
  const { token: authDenyResponseToken } = searchParams;

  if (!authDenyResponseToken) throw new Error("Missing token query parameter.");

  const { data: authDenyResponse, error: decryptAuthDenyResponseError } =
    await decryptAuthDenyResponse({ data: authDenyResponseToken });

  if (decryptAuthDenyResponseError !== undefined)
    throw new Error(decryptAuthDenyResponseError);

  const { data: loginRequest, error: getLoginRequestError } =
    await getLoginRequest({ challenge: authDenyResponse.challenge });

  if (getLoginRequestError !== undefined) {
    if (getLoginRequestError instanceof Object)
      redirect(getLoginRequestError.redirect_to);
    throw new Error(getLoginRequestError);
  }

  const { data: rejectLoginResponse, error: rejectLoginRequestError } =
    await rejectLoginRequest({
      challenge: loginRequest.challenge,
      errorHint: authDenyResponse.error,
    });

  if (rejectLoginRequestError !== undefined)
    throw new Error(rejectLoginRequestError);
  redirect(rejectLoginResponse.redirect_to);
}
