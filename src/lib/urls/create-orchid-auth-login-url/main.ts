import "server-only";

import {
  CreateOrchidAuthLoginURLInput,
  CreateOrchidAuthLoginURLOutput,
} from "./types";
import { getOrchidURL } from "./utils";

export function createOrchidAuthLoginURL({
  token,
}: CreateOrchidAuthLoginURLInput): CreateOrchidAuthLoginURLOutput {
  const base = getOrchidURL();
  const path = "/auth/login";
  const query = new URLSearchParams({ token: token }).toString();
  const url = query ? `${base}${path}?${query}` : `${base}${path}`;

  return { url: url };
}
