import { cache } from "react";
import { withAuth } from "@workos-inc/authkit-nextjs";

export const getCurrentSession = cache(async () => {
  return withAuth({ ensureSignedIn: true });
});