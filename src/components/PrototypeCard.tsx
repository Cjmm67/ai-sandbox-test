import Link from 'next/link';
import type { Prototype } from '@/lib/prototypes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, StatusBadge } from './ui';

export function PrototypeCard({ prototype }: { prototype: Prototype }) {
  return (
    <Link href={`/prototypes/${prototype.slug}`} className="block">
      <Card className="h-full transition-colors hover:border-zinc-400 dark:hover:border-zinc-600">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base">{prototype.name}</CardTitle>
            <StatusBadge status={prototype.status} />
          </div>
          <CardDescription className="line-clamp-2">{prototype.problem}</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-1.5 text-sm">
            <div className="flex gap-2">
              <dt className="text-zinc-500 dark:text-zinc-400">Impact</dt>
              <dd className="line-clamp-1">{prototype.impact}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-zinc-500 dark:text-zinc-400">Champion</dt>
              <dd>{prototype.champion}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-zinc-500 dark:text-zinc-400">Venue</dt>
              <dd>{prototype.venue}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </Link>
  );
}
