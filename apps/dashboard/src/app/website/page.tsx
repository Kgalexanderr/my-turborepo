
"use client"
import { Button } from "@repo/ui/components/button"

export default function WebsitePage(){

  async function test1(){
    const res = await fetch("/api/websites/", {
      method: "GET",
      // credentials: "include",
      headers: { 
        "Content-Type": "application/json" 
      },
      // body: JSON.stringify({
      //   name: "My Portfolio",
      //   url: "https://example.com"
      // })
    });

    console.log(res)
  }

  return(
    <main className="p-12">
      <h1>Organization Website</h1>
      <p>Title: </p>
      <p>Id: </p>
      <p>Last Updated: </p>
      <p>Connected Domain: </p>
      <Button>
        <a href={process.env.NEXT_PUBLIC_EDITOR_URL + "/32834235"}>Edit</a>
      </Button>

      <Button onClick={() => test1()}>
        Test 1
      </Button>
    </main>

  )
}