import { withAuth } from '@workos-inc/authkit-nextjs';

export default async function Page() {

  const { user } = await withAuth({
    ensureSignedIn: true,
  });

  return (
    <div className="flex justify-center items-center p-4 h-[100vh]">
      {user ?(
        <div>
          <h1>You are now authenticated into the editor</h1>
        </div>
      ) : (
        <div>
          <h1>Sign in to edit this website 2</h1>
        </div>
      )}
    </div>
  );
}
