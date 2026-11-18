import { withAuth } from '@workos-inc/authkit-nextjs';


export default async function EditSite({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params;

  const { user } = await withAuth({
    ensureSignedIn: true,
  });

  return(
    <div>
      Editing site {id}
    </div>
  )
}