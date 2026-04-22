import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold">
          1-Group AI Sandbox
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/" className="hover:underline">Showcase</Link>
          <Link href="/submit" className="hover:underline">Submit idea</Link>
          <Link href="/archive" className="hover:underline">Archive</Link>
          <Link href="/hello-claude" className="hover:underline">Hello Claude</Link>
        </nav>
      </div>
    </header>
  );
}
