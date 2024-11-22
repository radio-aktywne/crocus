import { components } from "../../../../services/scorpion";

export type AcceptConsentRequestInput = {
  challenge: string;
} & components["schemas"]["acceptOAuth2ConsentRequest"];

export type AcceptConsentRequestOutput = {
  redirect: string;
};
