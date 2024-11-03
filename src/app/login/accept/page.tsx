import { redirect } from "next/navigation";
import {
  acceptLoginRequest,
  decryptAuthAcceptResponse,
  getLoginRequest,
} from "../../../actions";

export type LoginAcceptPageSearchParams = Readonly<{
  token?: string;
}>;

export type LoginAcceptPageProps = Readonly<{
  searchParams: LoginAcceptPageSearchParams;
}>;

export const dynamic = "force-dynamic";

export default async function LoginAcceptPage({
  searchParams,
}: LoginAcceptPageProps) {
  const { token: authAcceptResponseToken } = searchParams;

  if (!authAcceptResponseToken)
    throw new Error("Missing token query parameter.");

  const { data: authAcceptResponse, error: decryptAuthAcceptResponseError } =
    await decryptAuthAcceptResponse({ data: authAcceptResponseToken });

  if (decryptAuthAcceptResponseError !== undefined)
    throw new Error(decryptAuthAcceptResponseError);

  const { data: loginRequest, error: getLoginRequestError } =
    await getLoginRequest({ challenge: authAcceptResponse.challenge });

  if (getLoginRequestError !== undefined) {
    if (getLoginRequestError instanceof Object)
      redirect(getLoginRequestError.redirect_to);
    throw new Error(getLoginRequestError);
  }

  const { data: acceptLoginResponse, error: acceptLoginRequestError } =
    await acceptLoginRequest({
      challenge: loginRequest.challenge,
      subject: authAcceptResponse.subject,
      context: {
        subject: authAcceptResponse.subject,
      },
    });

  if (acceptLoginRequestError !== undefined)
    throw new Error(acceptLoginRequestError);
  redirect(acceptLoginResponse.redirect_to);
}
