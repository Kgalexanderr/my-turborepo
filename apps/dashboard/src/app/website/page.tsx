"use client"

import { useState } from "react";
import { Button } from "@repo/ui/components/button"
import { websites } from "@repo/shared/types/websites"

export default function WebsitePage(){

  const [website, setWebsite] = useState<websites>()

  async function test1(){
    const res = await fetch("/api/websites/", {
      method: "GET",
      credentials: "include",
      headers: { 
        "Content-Type": "application/json" 
      },
      // body: JSON.stringify({
      //   name: "My Portfolio",
      //   url: "https://example.com"
      // })
    });

    if(!res.ok){
      throw new Error("Failed to fetch website.");
    }

    const website = await res.json();

    setWebsite(website[0])

    console.log(res, website)
  }

  return(
    <main className="p-12">

      {website && 
        <div>
          <h1>Organization Website</h1>
          <p>Title: {website.title}</p>
          <p>Id: {website.id}</p>
          <p>Last Updated: {website.updated_at}</p>
        </div>
      }

      <Button>
        <a href={process.env.NEXT_PUBLIC_EDITOR_URL + "/32834235"}>Edit</a>
      </Button>

      <Button onClick={() => test1()}>
        Test 1
      </Button>

    </main>

  )
}