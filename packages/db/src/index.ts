import { createClient } from "@supabase/supabase-js";

type DbClientOptions = {
  url: string;
  publishableKey: string;
  accessToken: string;
};

export function createDbClient({ url, publishableKey, accessToken }: DbClientOptions) {
  return createClient(url, publishableKey, {
    accessToken: async () => accessToken,
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/*
  By default, createClient from @supabase/supabase-js assumes it is running in a browser using Supabase Auth. Because of that, it spins up internal auth machinery to:

  persistSession: true — Read and write session tokens to storage (like localStorage) so users stay logged in across page reloads.

  autoRefreshToken: true — Start background timers to automatically refresh expiring Supabase JWTs.

  detectSessionInUrl: true — Inspect the browser URL for OAuth callback tokens.

  In your setup, none of that is needed for two reasons:

  You're on the server: Each API request creates a fresh db client, runs a query, and throws the client away. There is no browser storage or long-lived session to maintain.

  WorkOS handles your auth: AuthKit (withAuth()) already manages session persistence and token refreshes for you.

  Setting persistSession: false and autoRefreshToken: false is a standard server-side safeguard with @supabase/supabase-js—it guarantees the SDK doesn't waste cycles attempting storage lo
*/