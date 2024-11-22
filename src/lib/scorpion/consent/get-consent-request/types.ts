import { components } from "../../../../services/scorpion";

export type GetConsentRequestInput = {
  challenge: string;
};

export type GetConsentRequestOutput = {
  request: components["schemas"]["oAuth2ConsentRequest"];
};
