import { authkitProxy } from '@workos-inc/authkit-nextjs';

export default authkitProxy({
  redirectUri: process.env.NEXT_PUBLIC_WORKOS_CALLBACK_REDIRECT_URI
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

// Match against the pages
// export const config = {
//   matcher: ['/', '/account/:path*', '/api/:path*', '/test-session-error/:path*'],
// };