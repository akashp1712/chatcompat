import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

// Define the expected OpenAI /chat/completions response structure
interface OpenAIChatCompletionResponse {
  id?: string;
  object?: string;
  created?: number;
  model?: string;
  choices?: Array<{
    index?: number;
    message?: {
      role: string;
      content: string;
    };
    finish_reason?: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  error?: {
    message: string;
    type: string;
    param?: string | null;
    code?: string | null;
  };
}

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

    // Parse the response and assert the type
    const nonStreamData = (await nonStreamRes.json()) as OpenAIChatCompletionResponse;
    const payloadOk = nonStreamRes.ok;

    // Check if the response matches OpenAI's expected format with runtime validation
    const responseOk =
      nonStreamData &&
      'choices' in nonStreamData &&
      Array.isArray(nonStreamData.choices) &&
      nonStreamData.choices.length > 0 &&
      nonStreamData.choices[0]?.message?.content != null;

    const logs = [
      `Non-streaming request: ${JSON.stringify({ ...payload, stream: false })}`,
      `Response: ${JSON.stringify(nonStreamData)}`,
    ];

    // Log any error messages from the API
    if (nonStreamData?.error) {
      logs.push(`API Error: ${nonStreamData.error.message} (${nonStreamData.error.type})`);
    }

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
    logs.push(
      `Streaming request: ${JSON.stringify({ ...payload, stream: true })}`,
      `Content-Type: ${streamRes.headers.get('content-type')}`,
    );

    return NextResponse.json({
      payloadCompatibility: payloadOk ? 'pass' : 'fail',
      responseCompatibility: responseOk ? 'pass' : 'fail',
      streamingSupport: streamingOk ? 'pass' : 'fail',
      logs,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message, logs: [`Error: ${(error as Error).message}`] },
      { status: 500 },
    );
  }
}