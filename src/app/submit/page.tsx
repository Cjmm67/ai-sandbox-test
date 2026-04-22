'use client';

import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
} from '@/components/ui';

export default function SubmitIdeaPage() {
  const [form, setForm] = useState({
    problem: '',
    dreamOutcome: '',
    whoFeelsPain: '',
    estimatedImpact: '',
    champion: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    ok: boolean;
    message: string;
    issueUrl?: string;
  } | null>(null);

  async function submit() {
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; message: string; issueUrl?: string };
      setResult(data);
      if (data.ok) {
        setForm({
          problem: '',
          dreamOutcome: '',
          whoFeelsPain: '',
          estimatedImpact: '',
          champion: '',
        });
      }
    } catch (err) {
      setResult({ ok: false, message: err instanceof Error ? err.message : 'Submission failed.' });
    } finally {
      setSubmitting(false);
    }
  }

  const canSubmit =
    form.problem.trim() && form.whoFeelsPain.trim() && form.estimatedImpact.trim();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Submit an idea to the Idea Lounge</CardTitle>
          <CardDescription>
            Every submission becomes a GitHub Issue the sandbox owner triages at office
            hours. Be specific — vague ideas go to the bottom of the pile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="problem">Problem *</Label>
            <Textarea
              id="problem"
              rows={3}
              placeholder="What hurts today? One sentence, concrete, no jargon."
              value={form.problem}
              onChange={(e) => setForm({ ...form, problem: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dreamOutcome">Dream outcome</Label>
            <Textarea
              id="dreamOutcome"
              rows={2}
              placeholder="What does the world look like if this works?"
              value={form.dreamOutcome}
              onChange={(e) => setForm({ ...form, dreamOutcome: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whoFeelsPain">Who feels this pain? *</Label>
            <Input
              id="whoFeelsPain"
              placeholder="e.g. Mott 32 GM on Sunday lunch"
              value={form.whoFeelsPain}
              onChange={(e) => setForm({ ...form, whoFeelsPain: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estimatedImpact">Estimated impact *</Label>
            <Input
              id="estimatedImpact"
              placeholder="Hours saved per week, revenue affected, cost reduced. Rough guess."
              value={form.estimatedImpact}
              onChange={(e) => setForm({ ...form, estimatedImpact: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="champion">Willing champion</Label>
            <Input
              id="champion"
              placeholder="Your name, or someone you'd nominate."
              value={form.champion}
              onChange={(e) => setForm({ ...form, champion: e.target.value })}
            />
          </div>
          <Button onClick={submit} disabled={!canSubmit || submitting}>
            {submitting ? 'Submitting…' : 'Submit to Idea Lounge'}
          </Button>

          {result ? (
            <div
              className={
                result.ok
                  ? 'rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-900 dark:border-green-800 dark:bg-green-900/30 dark:text-green-100'
                  : 'rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-900 dark:border-red-800 dark:bg-red-900/30 dark:text-red-100'
              }
            >
              {result.message}
              {result.issueUrl ? (
                <>
                  {' '}
                  <a
                    href={result.issueUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    View issue
                  </a>
                </>
              ) : null}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
