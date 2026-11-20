import { redirect } from "next/navigation";

export async function GET() {
  redirect(process.env.NEXT_PUBLIC_APP_URL!);
}