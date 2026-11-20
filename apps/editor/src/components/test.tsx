"use client";

import { Button } from "@repo/ui/components/button";

export function EditSiteClient({ id }: { id: string }) {
  async function test1() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/websites`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    console.log("With credentials:", res.status);
    console.log(await res.json());
  }

  async function test2() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/websites`,
      {
        method: "GET"      
      }
    );

    console.log("Without credentials:", res.status);
    console.log(await res.json());
  }

  return (
    <div>
      <h1>Editing site {id}</h1>

      <Button onClick={test1}>
        Test 1 (with credentials)
      </Button>

      <Button onClick={test2}>
        Test 2 (without credentials)
      </Button>
    </div>
  );
}