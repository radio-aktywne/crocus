import { trimEnd } from "es-toolkit/string";

import { createUrl } from "../../../../common/generic/lib/create-url";
import { state } from "../../../../server/state/vars/state";

export function createLogoutUrl(token: string) {
  return createUrl({
    host: state.current.config.urls.orchid.host,
    path: `${trimEnd(state.current.config.urls.orchid.path ?? "", "/")}/auth/logout`,
    port: state.current.config.urls.orchid.port,
    query: { token: token },
    scheme: state.current.config.urls.orchid.scheme,
  });
}
