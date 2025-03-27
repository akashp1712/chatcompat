import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(req: Request) {
  const { url, apiKey, payload } = await req.json();

  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

    // Non-streaming test
    const nonStreamRes = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ ...payload, stream: false }),
    });
    const nonStreamData = await nonStreamRes.json();
    const payloadOk = nonStreamRes.ok;
    const responseOk = nonStreamData.choices && nonStreamData.choices[0]?.message?.content;
    const logs = [`Non-streaming request: ${JSON.stringify({ ...payload, stream: false })}`, `Response: ${JSON.stringify(nonStreamData)}`];

    // Streaming test
    let streamingOk = false;
    const streamRes = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ ...payload, stream: true }),
    });
    if (streamRes.headers.get('content-type')?.includes('text/event-stream')) {
      streamingOk = true;
    }
    logs.push(`Streaming request: ${JSON.stringify({ ...payload, stream: true })}`, `Content-Type: ${streamRes.headers.get('content-type')}`);

    return NextResponse.json({
      payloadCompatibility: payloadOk ? 'pass' : 'fail',
      responseCompatibility: responseOk ? 'pass' : 'fail',
      streamingSupport: streamingOk ? 'pass' : 'fail',
      logs,
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message, logs: [`Error: ${(error as Error).message}`] }, { status: 500 });
  }
}