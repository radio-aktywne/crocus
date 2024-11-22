import { components } from "../../../../services/scorpion";

export type RejectLoginRequestInput = {
  challenge: string;
} & components["schemas"]["rejectOAuth2Request"];

export type RejectLoginRequestOutput = {
  redirect: string;
};
