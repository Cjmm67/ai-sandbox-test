import { getArchivedPrototypes } from '@/lib/prototypes';
import { PrototypeCard } from '@/components/PrototypeCard';

export const dynamic = 'force-static';

export default function ArchivePage() {
  const prototypes = getArchivedPrototypes();

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold">What we tried and learned</h1>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          Prototypes that were killed or parked. Failures published build institutional
          courage — a sandbox with a zero kill rate isn&apos;t pruning enough.
        </p>
      </header>

      {prototypes.length === 0 ? (
        <div className="rounded-md border border-dashed border-zinc-300 p-12 text-center text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          Nothing archived yet. That&apos;s healthy to begin with.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {prototypes.map((p) => (
            <PrototypeCard key={p.slug} prototype={p} />
          ))}
        </div>
      )}
    </div>
  );
}
