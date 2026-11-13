"use client"

import { Button } from "@repo/ui/components/button";

export default function Page() {

  function test(){
    console.log("Published")
  }

  return (
    <div className="flex justify-center items-center p-4 h-[100vh]">
      <Button onClick={test}>Publish</Button>
    </div>
  );
}
