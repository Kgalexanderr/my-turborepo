import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from '@vercel/firewall';
import { withAuth } from "@workos-inc/authkit-nextjs";


import { createUserDb } from "@repo/db/server";
import { getCorsHeaders } from "@/lib/cors";

/**
 * CORS preflight handler
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request.headers.get("origin")),
  });
}



/**
 * API Route to retrun all websites belonging to an organization
 * @returns All organization websites
 */
export async function GET(request: NextRequest) {

  const corsHeaders = getCorsHeaders(request.headers.get("origin"));
  
  const { rateLimited } = await checkRateLimit('auth-rate-limit', { 
    request
    // rateLimitKey: organizationId,
    // provide firewallHostForDevelopment for development mode testing
  });

  if (rateLimited) {
    return NextResponse.json(
      {
        error: "Rate limit exceeded",
        message: "Moving too fast, please slow down.",
      },
      {
        status: 429,
        headers: corsHeaders,
      }
    );
  }
  
  const {user, accessToken, organizationId} = await withAuth()

  // check auth
  if (!user || !accessToken) {
    return NextResponse.json(
      { 
        error: "Unauthorized",
        message: "Invalid or expired authentication session." // Was credentials: "include" included?
      },
      { status: 401, headers: corsHeaders }
    );
  }

  // check organization
  if (!organizationId) {
    return NextResponse.json(
      {
        error: "Forbidden",
        message: "No active organization."
      },
      { status: 403, headers: corsHeaders }
    );
  }

  // Access database
  const db = createUserDb(accessToken);

  const { data, error } = await db
    .from('websites')
    .select('content')
    .eq("organization_id", organizationId);

  if (error) {
    return NextResponse.json(
      { 
        error: error.message 
      }, 
      { status: 500, headers: corsHeaders  }
    );
  }

  return NextResponse.json(data, {  status: 200, headers: corsHeaders  });
}



/**
 * API Route to create an organization websites
 * @description Only one website is allowed per organization
 */
export async function POST(request: Request) {

  const corsHeaders = getCorsHeaders(request.headers.get("origin"));

  const { rateLimited } = await checkRateLimit('auth-rate-limit', { 
    request
    // rateLimitKey: organizationId,
    // provide firewallHostForDevelopment for development mode testing
  });

  if (rateLimited) {
    return NextResponse.json(
      {
        error: "Rate limit exceeded",
        message: "Moving too fast, please slow down.",
      },
      {
        status: 429,
        headers: corsHeaders,
      }
    );
  }

  const {user, permissions, accessToken, organizationId} = await withAuth()
  
  // check auth
  if (!user || !accessToken) {
    return NextResponse.json(
      { 
        error: "Unauthorized",
        message: "Invalid or expired authentication session." // Was credentials: "include" included?
      },
      { status: 401, headers: corsHeaders }
    );
  }

  // check organization
  if (!organizationId) {
    return NextResponse.json(
      {
        error: "Forbidden",
        message: "No active organization."
      },
      { status: 403, headers: corsHeaders }
    );
  }

  // check permissions
  if(!permissions?.includes("create-websites")){
    return NextResponse.json(
      {
        error: "Forbidden",
        message: "Missing required permission to create a website."
      },
      { status: 403, headers: corsHeaders }
    )
  }

  // Access database
  const db = createUserDb(accessToken);

  const { error } = await db
    .from("websites")
    .insert({
      organization_id: organizationId,
      content: "Hello, Grapes!"
      // ...other fields
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        {
          error: "Conflict",
          message: "Organization already has a website.",
        },
        { status: 409, headers: corsHeaders }
      );
    }
  
    return NextResponse.json(
      { 
        error: error.message 
      }, 
      { status: 500,  headers: corsHeaders  }
    );
  }
  
  return NextResponse.json(
    { message: "Organization website created successfully." },
    { status: 200, headers: corsHeaders }
  );
}