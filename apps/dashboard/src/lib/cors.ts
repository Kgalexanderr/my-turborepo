const allowedOrigins = new Set([
  "https://app.ongrapes.com",
  "https://editor.ongrapes.com",
  "http://localhost:3001",
  "http://localhost:3002",
]);

export function getCorsHeaders(origin: string | null) {
  const headers = new Headers({
    "Vary": "Origin",
  });

  // Only allow trusted origins
  if (!origin || !allowedOrigins.has(origin)) {
    return headers;
  }

  headers.set("Access-Control-Allow-Origin", origin);

  headers.set("Access-Control-Allow-Credentials", "true");

  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return headers;
}