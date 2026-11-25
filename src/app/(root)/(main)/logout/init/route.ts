import type { NextRequest } from "next/server";

import { trimEnd } from "es-toolkit/string";
import { redirect } from "next/navigation";
import { connection } from "next/server";

import type { RouteInput } from "../../../../types";
import type { Keys } from "./types";

import { createUrl } from "../../../../../common/generic/lib/create-url";
import { state } from "../../../../../server/state/vars/state";

export async function GET(request: NextRequest, {}: RouteInput<Keys.Path>) {
  await connection();

  redirect(
    createUrl({
      host: state.current.config.urls.scorpion.host,
      path: `${trimEnd(state.current.config.urls.scorpion.path ?? "", "/")}/oauth2/sessions/logout`,
      port: state.current.config.urls.scorpion.port,
      query: Object.fromEntries(request.nextUrl.searchParams),
      scheme: state.current.config.urls.scorpion.scheme,
    }).url,
  );
}
