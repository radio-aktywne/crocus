import type { CreateErrorUrlInput, CreateErrorUrlOutput } from "./types";

import { createUrl } from "../../../../../common/generic/lib/create-url";
import { constants } from "./constants";

export function createErrorUrl({
  debug,
  description,
  error,
  hint,
}: CreateErrorUrlInput = {}): CreateErrorUrlOutput {
  return createUrl({
    path: "/error",
    query: {
      ...constants.defaults,
      ...(debug ? { debug: debug } : {}),
      ...(description ? { description: description } : {}),
      ...(error ? { error: error } : {}),
      ...(hint ? { hint: hint } : {}),
    },
  });
}
