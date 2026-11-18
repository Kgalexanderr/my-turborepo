
import { createDbClient } from "@repo/db";

export function getNotesDb(accessToken: string) {
  return createDbClient({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    publishableKey:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    accessToken,
  });
}
