import {
  CreateLoginAcceptPathInput,
  CreateLoginAcceptPathOutput,
} from "./types";

export function createLoginAcceptPath({
  token,
}: CreateLoginAcceptPathInput): CreateLoginAcceptPathOutput {
  const params = new URLSearchParams({ token: token });

  const path = `/login/accept?${params.toString()}`;

  return { path: path };
}
