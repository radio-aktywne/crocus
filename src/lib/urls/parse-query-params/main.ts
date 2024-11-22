import { z } from "zod";

import { ParseQueryParamsInput, ParseQueryParamsOutput } from "./types";

export function parseQueryParams<T extends z.AnyZodObject>({
  params,
  schema,
}: ParseQueryParamsInput<T>): ParseQueryParamsOutput<T> {
  const result = schema.safeParse(Object.fromEntries(params));

  return result.success ? { data: result.data } : { error: result.error };
}
