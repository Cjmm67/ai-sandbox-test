import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: NextRequest) {
  const { prompt } = (await req.json()) as { prompt: string };

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      reply:
        '(Demo mode — no ANTHROPIC_API_KEY set.) If this were wired up, Claude would respond to: "' +
        prompt +
        '"',
    });
  }

  try {
    const client = new Anthropic({ apiKey });
    const msg = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 256,
      messages: [{ role: 'user', content: prompt }],
    });
    const text = msg.content
      .map((block) => (block.type === 'text' ? block.text : ''))
      .join('')
      .trim();
    return NextResponse.json({ reply: text || '(empty response)' });
  } catch (err) {
    console.error('Anthropic API error', err);
    return NextResponse.json({
      reply: 'Claude is temporarily unavailable. The rest of the sandbox still works.',
    });
  }
}
