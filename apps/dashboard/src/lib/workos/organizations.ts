import { getWorkOS } from "@workos-inc/authkit-nextjs";
import { getCurrentSession } from "./session";

export async function getMyOrganizations() {
  const { user } = await getCurrentSession();

  const result =
    await getWorkOS().userManagement.listOrganizationMemberships({
      userId: user.id,
    });

  const memberships = await result.autoPagination();

  return memberships.map((membership) => ({
    id: membership.organizationId,
    name: membership.organizationName ?? membership.organizationId,
    role: membership.role.slug,
  }));
}