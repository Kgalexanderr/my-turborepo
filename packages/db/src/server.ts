
import "server-only";

import { withAuth } from "@workos-inc/authkit-nextjs";
import { createDbClient } from "./index";

export async function getAuthenticatedDb() {
  const { user, accessToken } = await withAuth();

  if (!user || !accessToken) {
    return null;
  }

  const db = createDbClient({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    publishableKey:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    accessToken,
  });

  return { db, user };
}
