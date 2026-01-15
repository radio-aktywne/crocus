import type { JsonRawMessage } from "../../../../../common/apis/scorpion/types";

export type IdToken = {
  sub?: string;
  traits?: unknown;
};

export type CreateIdTokenInput = {
  context: JsonRawMessage;
};

export type CreateIdTokenOutput = {
  token: IdToken;
};
