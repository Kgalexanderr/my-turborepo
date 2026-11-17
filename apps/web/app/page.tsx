import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center p-4 h-[100vh]">
      <h1>Marketing App</h1>
      <div className="flex flex-row gap-4">
        <Link href="/login">Login</Link>
        <Link href={process.env.NEXT_PUBLIC_APP_URL || ''}>Dashboard</Link>
        <Link href={process.env.NEXT_PUBLIC_EDITOR_URL || ''}>Editor</Link>
      </div>
    </div>
  );
}
