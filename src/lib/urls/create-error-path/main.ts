import { CreateErrorPathInput, CreateErrorPathOutput } from "./types";

export function createErrorPath({
  debug,
  description,
  error,
  hint,
}: CreateErrorPathInput): CreateErrorPathOutput {
  const params = new URLSearchParams();
  if (debug) params.append("error_debug", debug);
  if (description) params.append("error_description", description);
  if (error) params.append("error", error);
  if (hint) params.append("error_hint", hint);

  const path = `/error?${params.toString()}`;

  return { path: path };
}
