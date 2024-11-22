import { CreateLoginDenyPathInput, CreateLoginDenyPathOutput } from "./types";

export function createLoginDenyPath({
  token,
}: CreateLoginDenyPathInput): CreateLoginDenyPathOutput {
  const params = new URLSearchParams({ token: token });

  const path = `/login/deny?${params.toString()}`;

  return { path: path };
}
