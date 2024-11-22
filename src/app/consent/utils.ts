export function createIdToken(context: unknown) {
  const ctx = context instanceof Object ? context : {};
  return {
    sub:
      "subject" in ctx && typeof ctx.subject === "string"
        ? ctx.subject
        : undefined,
  };
}
