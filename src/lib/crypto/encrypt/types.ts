import { JWTPayload } from "jose";

export type EncryptInput = {
  data: JWTPayload;
};

export type EncryptOutput = {
  data: string;
};
