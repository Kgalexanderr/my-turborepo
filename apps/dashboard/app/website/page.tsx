import { Button } from "@repo/ui/components/button"

export default function WebsitePage(){
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
    </main>

  )
}