import "server-only";

import {
  CreateOrchidAuthLogoutURLInput,
  CreateOrchidAuthLogoutURLOutput,
} from "./types";
import { getOrchidURL } from "./utils";

export function createOrchidAuthLogoutURL({
  token,
}: CreateOrchidAuthLogoutURLInput): CreateOrchidAuthLogoutURLOutput {
  const base = getOrchidURL();
  const path = "/auth/logout";
  const query = new URLSearchParams({ token: token }).toString();
  const url = query ? `${base}${path}?${query}` : `${base}${path}`;

  return { url: url };
}
