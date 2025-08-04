// src/app/api/assistant/route.ts

import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  // 1. Parse JSON
  let body;
  try {
    body = await request.json();
  } catch (e) {
    console.error('Invalid JSON:', e);
    return NextResponse.json({ reply: 'Invalid request body.' }, { status: 400 });
  }

  // 2. Validate
  const { message } = body;
  if (!message || typeof message !== 'string') {
    return NextResponse.json({ reply: 'Please send a text message.' }, { status: 400 });
  }

  // 3. Build prompt
  const prompt = `
You are GateKPT, an AI mastering assistant. Respond musically to:
User: ${message}
`.trim();

  // 4. Fetch from OpenAI
  let aiRes;
  try {
    aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 300,
      }),
    });
  } catch (networkErr) {
    console.error('Network error:', networkErr);
    return NextResponse.json({ reply: 'AI service unreachable.' }, { status: 502 });
  }

  if (!aiRes.ok) {
    console.error('OpenAI error status:', aiRes.status);
    return NextResponse.json({ reply: 'AI service error.' }, { status: 502 });
  }

  // 5. Parse & return
  try {
    const data = await aiRes.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || 'No reply.';
    return NextResponse.json({ reply });
  } catch (parseErr) {
    console.error('Parse error:', parseErr);
    return NextResponse.json({ reply: 'Error parsing AI response.' }, { status: 500 });
  }
}
