import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getAllPrototypes, getPrototype } from '@/lib/prototypes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, StatusBadge } from '@/components/ui';

export function generateStaticParams() {
  return getAllPrototypes().map((p) => ({ slug: p.slug }));
}

export default function PrototypePage({ params }: { params: { slug: string } }) {
  const p = getPrototype(params.slug);
  if (!p) notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <Link
        href={p.archived ? '/archive' : '/'}
        className="text-sm text-zinc-500 hover:underline dark:text-zinc-400"
      >
        ← Back
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">{p.name}</h1>
          <p className="text-zinc-600 dark:text-zinc-400">{p.problem}</p>
        </div>
        <StatusBadge status={p.status} />
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardDescription>Champion</CardDescription>
            <CardTitle className="text-base">{p.champion}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Venue</CardDescription>
            <CardTitle className="text-base">{p.venue}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Impact</CardDescription>
            <CardTitle className="text-base">{p.impact}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Last updated</CardDescription>
            <CardTitle className="text-base">{p.last_updated || 'TBD'}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {p.demo_url ? (
        <Card>
          <CardHeader>
            <CardTitle>Live demo</CardTitle>
          </CardHeader>
          <CardContent>
            <a
              href={p.demo_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900"
            >
              Open prototype
            </a>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <article className="prose prose-zinc max-w-none dark:prose-invert">
            <ReactMarkdown>{p.body}</ReactMarkdown>
          </article>
        </CardContent>
      </Card>
    </div>
  );
}
