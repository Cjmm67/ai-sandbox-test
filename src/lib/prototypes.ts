import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

export type PrototypeStatus = 'Live' | 'Piloting' | 'Killed' | 'Scaled';

export interface Prototype {
  slug: string;
  name: string;
  status: PrototypeStatus;
  champion: string;
  venue: string;
  problem: string;
  impact: string;
  demo_url: string;
  last_updated: string;
  body: string;
  archived: boolean;
}

const CONTENT_DIR = join(process.cwd(), 'content', 'prototypes');

function loadOne(slug: string): Prototype | null {
  const path = join(CONTENT_DIR, `${slug}.md`);
  if (!existsSync(path)) return null;
  const raw = readFileSync(path, 'utf8');
  const { data, content } = matter(raw);

  const status = (data.status ?? 'Piloting') as PrototypeStatus;

  return {
    slug,
    name: String(data.name ?? slug),
    status,
    champion: String(data.champion ?? 'TBD'),
    venue: String(data.venue ?? 'All venues'),
    problem: String(data.problem ?? ''),
    impact: String(data.impact ?? 'TBD'),
    demo_url: String(data.demo_url ?? ''),
    last_updated: String(data.last_updated ?? ''),
    body: content.trim(),
    archived: status === 'Killed',
  };
}

export function getAllPrototypes(): Prototype[] {
  if (!existsSync(CONTENT_DIR)) return [];
  return readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
    .map(loadOne)
    .filter((p): p is Prototype => p !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getLivePrototypes(): Prototype[] {
  return getAllPrototypes().filter((p) => !p.archived);
}

export function getArchivedPrototypes(): Prototype[] {
  return getAllPrototypes().filter((p) => p.archived);
}

export function getPrototype(slug: string): Prototype | null {
  return loadOne(slug);
}
