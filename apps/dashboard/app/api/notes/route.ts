
import { NextResponse } from "next/server";
import { getAuthenticatedDb } from "@repo/db/server";

// READ
export async function GET() {
  const auth = await getAuthenticatedDb();

  if (!auth) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { db, user } = auth;

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
  const auth = await getAuthenticatedDb();

  if (!auth) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { db, user } = auth;

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
