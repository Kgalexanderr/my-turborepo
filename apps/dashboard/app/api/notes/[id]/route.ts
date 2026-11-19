
import { NextResponse } from "next/server";
import { createUserDb } from "@repo/db/server";
import { withAuth } from "@workos-inc/authkit-nextjs";


type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function DELETE(
  _request: Request,
  { params }: RouteParams
) {

  const {user, accessToken} = await withAuth()

  if (!user || !accessToken) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Access database
  const db = createUserDb(accessToken);
  
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Invalid note ID" },
      { status: 400 }
    );
  }

  const { data, error } = await db
    .from("demo_notes")
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id)
    .select("id")
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      { error: "Note not found" },
      { status: 404 }
    );
  }

  return new Response(null, { status: 204 });
}
