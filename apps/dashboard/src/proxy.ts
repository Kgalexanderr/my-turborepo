import { NextResponse, type NextRequest } from "next/server";
import {
  authkit,
  handleAuthkitProxy,
} from "@workos-inc/authkit-nextjs";

export default async function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;

  // Public APIs don't require a WorkOS session
  if (pathname.startsWith("/api/public/")) {
    return NextResponse.next();
  }

  // 1. Allow CORS preflight requests to reach the route handler immediately
  if (request.method === "OPTIONS") {
    return NextResponse.next();
  }

  const { session, headers } = await authkit(request);

  // 2. For API routes, never issue a 307 redirect—let the route handler
  //    enforce auth (via withAuth) and attach CORS headers to 401/403 responses
  if (pathname.startsWith("/api")) {
    return handleAuthkitProxy(request, headers);
  }

  // 3. Redirect unauthenticated page visits to login
  if (!session.user) {
    return handleAuthkitProxy(request, headers, {
      redirect: process.env.NEXT_PUBLIC_WORKOS_LOGIN_URL!,
      redirectStatus: 307,
    });
  }

  return handleAuthkitProxy(request, headers);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};