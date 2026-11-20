
import { withAuth } from "@workos-inc/authkit-nextjs";
import Notes from "@repo/ui/components/notes";

export default async function Page() {
  const { user, role, permissions } = await withAuth({
    ensureSignedIn: true,
  });

  if (!user) {
    return <p>Not authenticated</p>;
  }

  return (
    <main className="p-12">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Welcome, {user.firstName || user.email}
          </p>
        </div>
      </header>

      <section className="space-y-2 rounded-lg border p-4">
        <h2 className="font-semibold">User Information</h2>

        <p className="text-sm">ID: {user.id}</p>
        <p className="text-sm">Email: {user.email}</p>
        <p className="text-sm">Role: {role ?? "None"}</p>
        <p className="text-sm">
          Permissions: {permissions?.join(", ") || "None"}
        </p>
      </section>

      <Notes />
    </main>
  );
}
