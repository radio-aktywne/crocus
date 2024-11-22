import { components } from "../../../../services/scorpion";

export type GetLogoutRequestInput = {
  challenge: string;
};

export type GetLogoutRequestOutput = {
  request: components["schemas"]["oAuth2LogoutRequest"];
};
