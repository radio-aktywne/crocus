import { redirect } from "next/navigation";
import {
  decryptAuthRequest,
  encryptAuthAcceptResponse,
} from "../../../actions";

export type LoginAuthPageSearchParams = Readonly<{
  token?: string;
}>;

export type LoginAuthPageProps = Readonly<{
  searchParams: LoginAuthPageSearchParams;
}>;

export const dynamic = "force-dynamic";

export default async function LoginAuthPage({
  searchParams,
}: LoginAuthPageProps) {
  const { token: authRequestToken } = searchParams;

  if (!authRequestToken) throw new Error("Missing token query parameter.");

  const { data: authRequest, error: decryptAuthRequestError } =
    await decryptAuthRequest({ data: authRequestToken });

  if (decryptAuthRequestError !== undefined)
    throw new Error(decryptAuthRequestError);

  const {
    data: authAcceptResponseToken,
    error: encryptAuthAcceptResponseError,
  } = await encryptAuthAcceptResponse({
    challenge: authRequest.challenge,
    subject: "test@example.com",
  });

  if (encryptAuthAcceptResponseError !== undefined)
    throw new Error(encryptAuthAcceptResponseError);

  redirect(`/login/accept?token=${authAcceptResponseToken}`);
}
