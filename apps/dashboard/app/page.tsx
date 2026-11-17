
import { withAuth } from "@workos-inc/authkit-nextjs";
import { handleSignOutAction } from "./actions/signOut";
import SignInButton from "@repo/ui/components/sign-in-button";
import { createDbClient } from "@repo/db";

// Server Component: fetch and display notes
async function Notes({ accessToken }: { accessToken: string }) {
  const supabase = createDbClient({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    publishableKey:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    accessToken,
  });

  const { data: notes, error } = await supabase
    .from("demo_notes")
    .select("id, content, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return <p className="text-red-500">{error.message}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Demo Notes</h1>

      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {notes.map((note) => (
            <div key={note.id} className="rounded-lg border p-4">
              <p>{note.content}</p>
              <p className="mt-2 text-xs text-gray-500">
                {new Date(note.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default async function Page() {
  const {
    user,
    role,
    permissions,
    accessToken,
  } = await withAuth({ ensureSignedIn: true });

  if (!user || !accessToken) {
    return <p>Not authenticated</p>;
  }

  const userFields = [
    ["First name", user.firstName],
    ["Last name", user.lastName],
    ["Email", user.email],
    role ? ["Role", role] : [],
    permissions ? ["Permissions", permissions] : [],
    ["Id", user.id],
  ].filter((arr) => arr.length > 0);

  return (
    <>
      <div className="flex flex-col gap-12 justify-center items-center p-4">
        {userFields.length > 0 && (
          <div className="flex flex-col gap-4">
            {userFields.map(([label, value]) => (
              <div key={String(label)}>
                <label className="font-bold">{label}</label>
                <p className="text-sm">
                  {Array.isArray(value)
                    ? value.join(", ")
                    : value}
                </p>
              </div>
            ))}
          </div>
        )}

        <SignInButton signOutAction={handleSignOutAction} />
      </div>

      <div className="p-4">
        <Notes accessToken={accessToken} />
      </div>
    </>
  );
}
