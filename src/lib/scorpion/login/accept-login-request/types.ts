import { components } from "../../../../services/scorpion";

export type AcceptLoginRequestInput = {
  challenge: string;
} & components["schemas"]["acceptOAuth2LoginRequest"];

export type AcceptLoginRequestOutput = {
  redirect: string;
};
