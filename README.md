# 1-Group AI Sandbox — Test Deployment

A simplified single-app version of the 1-Group AI Sandbox, built to validate the concept on a personal GitHub + Vercel account before deploying the full monorepo architecture.

## What this is

A single Next.js application that demonstrates:

- **Showcase Gallery** — browse active AI prototypes (`/`)
- **Archive** — see what was tried and killed, with lessons (`/archive`)
- **Idea submission form** — creates real GitHub Issues when configured (`/submit`)
- **Example prototype** — a simple Claude-powered page (`/hello-claude`)

Prototypes are stored as markdown files in `content/prototypes/` — add one by committing a new file with the right front-matter block.

## What this is NOT

This is a **test scaffold**, not the production architecture. For the real 1-Group deployment, use the full monorepo scaffold that includes:

- pnpm workspaces with a shared `/packages` foundation
- Enforced Claude SDK wrapper with cost tracking per prototype
- Google Workspace SSO
- GitHub Actions workflows (CI, showcase-sync, data-access validation)
- CODEOWNERS with per-folder ownership
- Individual Vercel deployments per prototype
- Full Impact Tracker integration

The monorepo architecture is more robust but requires a developer to run `pnpm install` locally before the first Vercel deploy. This simpler version deploys cleanly on first push with no prerequisites.

## Local development

```bash
npm install
cp .env.example .env.local
# Fill in ANTHROPIC_API_KEY and GITHUB_TOKEN (both optional — demo mode works without)
npm run dev
```

Open `http://localhost:3000`.

## Deployment

1. Push to GitHub
2. Import the repo into Vercel (Framework: Next.js auto-detected)
3. Set environment variables in Vercel if you want real Claude and GitHub integration:
   - `ANTHROPIC_API_KEY` — enables Hello Claude
   - `GITHUB_TOKEN` — enables real GitHub Issue creation from /submit
   - `GITHUB_OWNER` — defaults to `Cjmm67`
   - `GITHUB_REPO` — defaults to `ai-sandbox-test`
4. Deploy

All env vars are optional — the app runs in demo mode if any are missing.

## Adding a prototype

Create `content/prototypes/<slug>.md` with front-matter:

```markdown
---
name: Display name
status: Piloting         # Live | Piloting | Killed | Scaled
champion: Your Name
venue: Venue name or "All venues"
problem: One sentence
impact: One sentence
demo_url: https://...    # optional
last_updated: 2026-04-22
---

## Free-form markdown body below

Whatever notes the champion wants to share.
```

Commit and push — Vercel redeploys and the new card appears.

## Dependencies

Minimal on purpose:

- Next.js 14 App Router
- Tailwind CSS (no shadcn, no component library — lighter)
- `@anthropic-ai/sdk` for Hello Claude
- `gray-matter` for front-matter parsing
- `react-markdown` for rendering prototype notes

Total `npm install` time: under 30 seconds.
