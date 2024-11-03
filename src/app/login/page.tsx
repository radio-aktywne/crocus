import { redirect } from "next/navigation";
import {
  acceptLoginRequest,
  encryptAuthRequest,
  getLoginRequest,
} from "../../actions";

export type LoginPageSearchParams = Readonly<{
  login_challenge?: string;
}>;

export type LoginPageProps = Readonly<{
  searchParams: LoginPageSearchParams;
}>;

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { login_challenge: challenge } = searchParams;

  if (!challenge) throw new Error("Missing login_challenge query parameter.");

  const { data: loginRequest, error: getLoginRequestError } =
    await getLoginRequest({ challenge });

  if (getLoginRequestError !== undefined) {
    if (getLoginRequestError instanceof Object)
      redirect(getLoginRequestError.redirect_to);
    throw new Error(getLoginRequestError);
  }

  if (loginRequest.skip) {
    const { data: acceptLoginResponse, error: acceptLoginRequestError } =
      await acceptLoginRequest({
        challenge: loginRequest.challenge,
        subject: loginRequest.subject,
      });

    if (acceptLoginRequestError !== undefined)
      throw new Error(acceptLoginRequestError);
    redirect(acceptLoginResponse.redirect_to);
  }

  const { data: token, error: encryptAuthRequestError } =
    await encryptAuthRequest({ challenge: loginRequest.challenge });

  if (encryptAuthRequestError !== undefined)
    throw new Error(encryptAuthRequestError);

  redirect(`/login/auth?token=${token}`);
}
