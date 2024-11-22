import { components } from "../../../../services/scorpion";

export type RejectConsentRequestInput = {
  challenge: string;
} & components["schemas"]["rejectOAuth2Request"];

export type RejectConsentRequestOutput = {
  redirect: string;
};
