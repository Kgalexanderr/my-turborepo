
import { NextResponse } from "next/server";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { createDbClient } from "@repo/db";

function getDb(accessToken: string) {
  return createDbClient({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    publishableKey:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    accessToken,
  });
}

// READ
export async function GET() {
  const { user, accessToken } = await withAuth();

  if (!user || !accessToken) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const db = getDb(accessToken);

  const { data, error } = await db
    .from("demo_notes")
    .select("*");

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    user: user.id,
    notes: data,
  });
}

// CREATE
export async function POST(request: Request) {
  const { user, accessToken } = await withAuth();

  if (!user || !accessToken) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

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

  const db = getDb(accessToken);

  const { data, error } = await db
    .from("demo_notes")
    .insert({
      owner_id: user.id,
      content,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 201 });
}
