
import { withAuth } from "@workos-inc/authkit-nextjs";
import { EditSiteClient } from "../../components/test";

// Check if auth (withAuth)

// Get website data (Supabase)
  // return if part of the organization
  // return if auth is valid

// revalidate user is part organization server side


export default async function EditSite({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params;

  const { user } = await withAuth({
    ensureSignedIn: true,
  });

  if(!user){
    return <p>Not authentated</p>
  }

  return(
    <div>
      Editing site {id}

      <EditSiteClient id={id} />
    </div>
  )
}