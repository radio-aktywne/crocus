import { components } from "../../../../services/scorpion";

export type GetLoginRequestInput = {
  challenge: string;
};

export type GetLoginRequestOutput = {
  request: components["schemas"]["oAuth2LoginRequest"];
};
