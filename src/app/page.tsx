import { getLivePrototypes } from '@/lib/prototypes';
import { PrototypeCard } from '@/components/PrototypeCard';

export const dynamic = 'force-static';

export default function HomePage() {
  const prototypes = getLivePrototypes();

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold">The Showcase</h1>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          Every active AI prototype built by 1-Group innovation champions. Tap any card to
          see the pitch, try the live demo, and leave feedback.
        </p>
      </header>

      {prototypes.length === 0 ? (
        <div className="rounded-md border border-dashed border-zinc-300 p-12 text-center text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          <p>No prototypes yet. Add one at <code>content/prototypes/&lt;slug&gt;.md</code>.</p>
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
