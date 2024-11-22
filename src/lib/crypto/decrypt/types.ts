import { JWTPayload } from "jose";

export type DecryptInput = {
  data: string;
};

export type DecryptOutput = {
  data: JWTPayload;
};
