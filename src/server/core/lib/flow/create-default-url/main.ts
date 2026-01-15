import { trimEnd } from "es-toolkit/string";

import type { CreateDefaultUrlInput, CreateDefaultUrlOutput } from "./types";

import { createUrl } from "../../../../../common/generic/lib/create-url";
import { state } from "../../../../state/vars/state";

export function createDefaultUrl({}: CreateDefaultUrlInput = {}): CreateDefaultUrlOutput {
  return createUrl({
    path: `${trimEnd(state.current.config.urls.crocus.path ?? "", "/")}/default`,
  });
}
