
import { NextResponse } from "next/server";
import { createUserDb } from "@repo/db/server";
import { withAuth } from "@workos-inc/authkit-nextjs";


// READ
export async function GET() {

  const {user, accessToken} = await withAuth()

  if (!user || !accessToken) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Access database
  const db = createUserDb(accessToken);

  const { data, error } = await db
    .from("demo_notes")
    .select("id, content, created_at")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ notes: data ?? [] });
}

// CREATE
export async function POST(request: Request) {
  const {user, roles, accessToken} = await withAuth()

  if (!user || !accessToken) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  console.log(roles)

  if(!roles?.includes("admin")){
    return Response.json(
      {error: "Unauthorized", message: "You don't have permission, contact your admin."},
      { status: 401 }
    )
  }

  // Access database
  const db = createUserDb(accessToken);

  const body = await request.json().catch(() => null);

  const content =
    typeof body?.content === "string"
      ? body.content.trim()
      : "";

  if (!content || content.length > 500) {
    return NextResponse.json(
      { error: "Content must be 1–500 characters" },
      { status: 400 }
    );
  }

  const { data, error } = await db
    .from("demo_notes")
    .insert({
      owner_id: user.id,
      content,
    })
    .select("id, content, created_at")
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 201 });
}
