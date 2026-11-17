import { NextRequest } from 'next/server';
import { authkit, handleAuthkitProxy } from '@workos-inc/authkit-nextjs';


export default async function proxy(request: NextRequest) {

  const { session, headers, authorizationUrl } = await authkit(request);

  if (!session.user && authorizationUrl) {
    return handleAuthkitProxy(request, headers,  {
      redirect: process.env.NEXT_PUBLIC_WORKOS_LOGIN_URL, 
      redirectStatus: 307,
    });
  }

  return handleAuthkitProxy(request, headers);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};