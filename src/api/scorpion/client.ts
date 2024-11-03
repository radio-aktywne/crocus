import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

const scheme = process.env.CROCUS__SCORPION__ADMIN__SCHEME || "http";
const host = process.env.CROCUS__SCORPION__ADMIN__HOST || "localhost";
const port =
  process.env.CROCUS__SCORPION__ADMIN__PORT === undefined
    ? 20001
    : process.env.CROCUS__SCORPION__ADMIN__PORT;
const path = (process.env.CROCUS__SCORPION__ADMIN__PATH || "")
  // Ensure path starts with a slash
  .replace(/^(?!\/)(.*)$/, "/$1")
  // Remove trailing slashes
  .replace(/\/+$/, "");
const url = `${scheme}://${host}${port ? `:${port}` : ""}${path}`;

export const scorpion = createClient<paths>({ baseUrl: url });
