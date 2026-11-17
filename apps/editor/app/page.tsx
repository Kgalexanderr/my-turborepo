import { withAuth } from '@workos-inc/authkit-nextjs';
import Link from 'next/link'

export default async function Page() {

  const { user } = await withAuth({
    ensureSignedIn: true,
  });

  return (
    <>
      <Link href={process.env.NEXT_PUBLIC_APP_URL || ''}>Dashboard</Link>
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
    </>
    
  );
}
