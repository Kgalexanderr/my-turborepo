import { createClient } from "@supabase/supabase-js";

type DbClientOptions = {
  url: string;
  publishableKey: string;
  accessToken: string;
};

export function createDbClient({
  url,
  publishableKey,
  accessToken,
}: DbClientOptions) {
  return createClient(url, publishableKey, {
    accessToken: async () => accessToken,
  });
}
