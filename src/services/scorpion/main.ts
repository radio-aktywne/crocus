import createClient from "openapi-fetch";
import "server-only";

import { paths } from "./types";

const scheme = process.env.CROCUS__SCORPION__ADMIN__SCHEME || "http";
const host = process.env.CROCUS__SCORPION__ADMIN__HOST || "localhost";
const port = process.env.CROCUS__SCORPION__ADMIN__PORT ?? 20001;
const path = (process.env.CROCUS__SCORPION__ADMIN__PATH || "")
  // Ensure path starts with a slash
  .replace(/^(?!\/)(.*)$/, "/$1")
  // Remove trailing slashes
  .replace(/\/+$/, "");
const url = `${scheme}://${host}${port ? `:${port}` : ""}${path}`;

export const scorpion = createClient<paths>({ baseUrl: url });
