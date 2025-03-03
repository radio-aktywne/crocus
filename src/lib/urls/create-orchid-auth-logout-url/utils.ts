export function getOrchidURL() {
  const scheme = process.env.CROCUS__ORCHID__PUBLIC__SCHEME || "http";
  const host = process.env.CROCUS__ORCHID__PUBLIC__HOST || "localhost";
  const port = process.env.CROCUS__ORCHID__PUBLIC__PORT ?? 20120;
  const path = (process.env.CROCUS__ORCHID__PUBLIC__PATH || "")
    // Ensure path starts with a slash
    .replace(/^(?!\/)(.*)$/, "/$1")
    // Remove trailing slashes
    .replace(/\/+$/, "");
  return `${scheme}://${host}${port ? `:${port}` : ""}${path}`;
}
