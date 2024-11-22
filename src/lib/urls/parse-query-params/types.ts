import { z } from "zod";

export type ParseQueryParamsInput<T extends z.AnyZodObject> = {
  params: URLSearchParams;
  schema: T;
};

export type ParseQueryParamsSuccessOutput<T extends z.AnyZodObject> = {
  data: z.infer<T>;
  error?: never;
};

export type ParseQueryParamsErrorOutput<T extends z.AnyZodObject> = {
  data?: never;
  error: z.ZodError<z.infer<T>>;
};

export type ParseQueryParamsOutput<T extends z.AnyZodObject> =
  | ParseQueryParamsErrorOutput<T>
  | ParseQueryParamsSuccessOutput<T>;
