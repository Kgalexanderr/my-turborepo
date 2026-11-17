"use client"

import { Button } from "@repo/ui/components/button"
import { useAuth,  } from '@workos-inc/authkit-nextjs/components';

type Props = {
  signOutAction: () => Promise<void>;
};

export default function SignInButton({signOutAction} : Props)
{
  const { user, loading } = useAuth();

  if(loading){
    return <div>Loading...</div>
  }

  if(user){
    return(
      <div>
        <form action={signOutAction}>
          <Button>Sign Out</Button>
        </form>
      </div>
    )
  }

  return(
    <Button>
      <a href="/login">Sign In With AuthKit</a>
    </Button>
  )
} 