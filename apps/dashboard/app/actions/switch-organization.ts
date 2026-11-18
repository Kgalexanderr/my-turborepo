"use server";

import { refreshSession } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";

export async function switchOrganization(organizationId: string) {
  await refreshSession({
    organizationId,
    ensureSignedIn: true,
  });

  redirect("/");
}