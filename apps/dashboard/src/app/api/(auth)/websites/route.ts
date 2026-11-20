import { NextRequest, NextResponse } from "next/server";
import { createUserDb } from "@repo/db/server";
import { withAuth } from "@workos-inc/authkit-nextjs";

import { getCorsHeaders } from "@/lib/cors";

// 1. Handle CORS Preflight Requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request.headers.get("origin")),
  });
}

export async function GET(request: NextRequest) {

  const corsHeaders = getCorsHeaders(request.headers.get("origin"));
  const data = { message: 'Hello from a CORS-enabled Next.js Route Handler!' };

  return NextResponse.json(data, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST() {
  const {user, permissions, accessToken, organizationId} = await withAuth()

  // check auth
  if (!user || !accessToken) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // check organization
  if (!organizationId) {
    return NextResponse.json(
      {
        error: "Forbidden",
        message: "No active organization."
      },
      { status: 403 }
    );
  }

  // check permissions
  if(!permissions?.includes("create-website")){
    return NextResponse.json(
      {
        error: "Forbidden",
        message: "Missing required permission to create a website."
      },
      {status: 403}
    )
  }

  // Access database
  const db = createUserDb(accessToken);

  // Check whether the organization has a website
  const { data: website, error } = await db
    .from("websites")
    .select("id")
    .eq("organization_id", organizationId)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }

  if (website) {
    return NextResponse.json(
      { error: "Organization already has a website" },
      { status: 409 }
    );
  }

  // Validate input and create the website here.

  // const {data, error} = await db
  //   .from("websites")
  //   .insert({ /* your website fields */ })
  //   .select()
  //   .single();


  console.log("Data: ", db, "User: ", user, "Permissions: ", permissions)
  
  return NextResponse.json(
    { message: "Authorized to create website" },
    { status: 200 }
  );
}