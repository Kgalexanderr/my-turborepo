'use server';

import { signOut } from '@workos-inc/authkit-nextjs';

export const handleSignOutAction = async () => {
  await signOut(
    {
      returnTo: process.env.NEXT_PUBLIC_BASE_URL
    }
  );
};