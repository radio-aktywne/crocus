import { redirect } from "next/navigation";
import { acceptConsentRequest, getConsentRequest } from "../../actions";

export type ConsentPageSearchParams = Readonly<{
  consent_challenge?: string;
}>;

export type ConsentPageProps = Readonly<{
  searchParams: ConsentPageSearchParams;
}>;

export const dynamic = "force-dynamic";

export default async function ConsentPage({ searchParams }: ConsentPageProps) {
  const { consent_challenge: challenge } = searchParams;

  if (!challenge) throw new Error("Missing consent_challenge query parameter.");

  const { data: consentRequest, error: getConsentRequestError } =
    await getConsentRequest({ challenge });

  if (getConsentRequestError !== undefined) {
    if (getConsentRequestError instanceof Object)
      redirect(getConsentRequestError.redirect_to);
    throw new Error(getConsentRequestError);
  }

  if (consentRequest.skip || consentRequest.client?.skip_consent) {
    const { data: acceptConsentResponse, error: acceptConsentRequestError } =
      await acceptConsentRequest({
        challenge: consentRequest.challenge,
        grantAudience: consentRequest.requested_access_token_audience,
        grantScope: consentRequest.requested_scope,
      });

    if (acceptConsentRequestError !== undefined)
      throw new Error(acceptConsentRequestError);
    redirect(acceptConsentResponse.redirect_to);
  }

  const context =
    consentRequest.context instanceof Object ? consentRequest.context : {};
  const idToken = {
    sub:
      "subject" in context && typeof context.subject === "string"
        ? context.subject
        : undefined,
  };

  const { data: acceptConsentResponse, error: acceptConsentRequestError } =
    await acceptConsentRequest({
      challenge: consentRequest.challenge,
      grantAudience: consentRequest.requested_access_token_audience,
      grantScope: consentRequest.requested_scope,
      idToken: idToken,
    });

  if (acceptConsentRequestError !== undefined)
    throw new Error(acceptConsentRequestError);
  redirect(acceptConsentResponse.redirect_to);
}
