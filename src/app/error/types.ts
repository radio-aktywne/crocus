export type ErrorPageSearchParams = {
  error?: string;
  error_debug?: string;
  error_description?: string;
  error_hint?: string;
};

export type ErrorPageInput = {
  searchParams: ErrorPageSearchParams;
};
