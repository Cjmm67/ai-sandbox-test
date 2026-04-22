import { NextRequest, NextResponse } from 'next/server';

interface Body {
  problem: string;
  dreamOutcome: string;
  whoFeelsPain: string;
  estimatedImpact: string;
  champion: string;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Body;

  if (
    !body.problem?.trim() ||
    !body.whoFeelsPain?.trim() ||
    !body.estimatedImpact?.trim()
  ) {
    return NextResponse.json(
      { ok: false, message: 'Problem, who-feels-the-pain, and estimated impact are required.' },
      { status: 400 },
    );
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER ?? 'Cjmm67';
  const repo = process.env.GITHUB_REPO ?? 'ai-sandbox-test';

  // Dev-mode fallback — no GITHUB_TOKEN set.
  if (!token) {
    console.log('[submit] (no GITHUB_TOKEN — would have created issue):', body);
    return NextResponse.json({
      ok: true,
      message:
        'Submitted in demo mode. Set GITHUB_TOKEN in Vercel env vars to create real GitHub Issues.',
    });
  }

  const title = `[Idea] ${body.problem.slice(0, 72)}${body.problem.length > 72 ? '…' : ''}`;
  const issueBody = [
    '## Problem',
    body.problem,
    '',
    '## Dream outcome',
    body.dreamOutcome || '_Not provided._',
    '',
    '## Who feels this pain',
    body.whoFeelsPain,
    '',
    '## Estimated impact',
    body.estimatedImpact,
    '',
    '## Willing champion',
    body.champion || '_Open for a volunteer._',
    '',
    '---',
    'Submitted via the sandbox /submit form.',
  ].join('\n');

  const gh = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
    method: 'POST',
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${token}`,
      'x-github-api-version': '2022-11-28',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ title, body: issueBody, labels: ['idea-submission'] }),
  });

  if (!gh.ok) {
    const err = await gh.text();
    console.error('GitHub API error', gh.status, err);
    return NextResponse.json(
      { ok: false, message: `GitHub rejected the issue (${gh.status}).` },
      { status: 502 },
    );
  }

  const issue = (await gh.json()) as { html_url: string; number: number };
  return NextResponse.json({
    ok: true,
    message: `Submitted! Issue #${issue.number} created.`,
    issueUrl: issue.html_url,
  });
}
