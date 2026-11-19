import "server-only";

import { createDbClient } from "./index";

export function createUserDb(accessToken: string) {

  const valid_url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const valid_publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if(!valid_url || !valid_publishableKey){
    throw new Error("Missing Supabase environment variables.");
  }

  return createDbClient({
    url: valid_url,
    publishableKey: valid_publishableKey,
    accessToken,
  });
}