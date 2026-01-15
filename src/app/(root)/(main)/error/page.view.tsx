import type { PageViewInput } from "../../../types";
import type { Schemas } from "./schemas";

import { ErrorWidget } from "../../../../isomorphic/core/components/flow/error-widget";

export async function ErrorPageView({
  queryParameters,
}: PageViewInput<typeof Schemas.Path, typeof Schemas.Query>) {
  const {
    error,
    error_debug: debug,
    error_description: description,
    error_hint: hint,
  } = queryParameters;

  return (
    <ErrorWidget
      debug={debug}
      description={description}
      error={error}
      hint={hint}
    />
  );
}
