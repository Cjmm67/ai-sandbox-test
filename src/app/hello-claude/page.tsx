'use client';

import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Textarea,
} from '@/components/ui';

export default function HelloClaudePage() {
  const [prompt, setPrompt] = useState('Say hello to 1-Group in one warm sentence.');
  const [reply, setReply] = useState('');
  const [pending, setPending] = useState(false);

  async function send() {
    setPending(true);
    setReply('');
    try {
      const res = await fetch('/api/hello', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = (await res.json()) as { reply: string };
      setReply(data.reply);
    } catch (err) {
      setReply(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Hello Claude — example prototype</CardTitle>
          <CardDescription>
            The simplest possible demonstration: a text prompt, a server route that calls the
            Anthropic API, and a response shown below. Works in demo mode without an API key.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button onClick={send} disabled={pending || !prompt.trim()}>
            {pending ? 'Thinking…' : 'Ask Claude'}
          </Button>
          {reply ? (
            <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
              {reply}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
