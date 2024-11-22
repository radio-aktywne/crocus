import { CreateLoginAuthPathInput, CreateLoginAuthPathOutput } from "./types";

export function createLoginAuthPath({
  token,
}: CreateLoginAuthPathInput): CreateLoginAuthPathOutput {
  const params = new URLSearchParams({ token: token });

  const path = `/login/auth?${params.toString()}`;

  return { path: path };
}
