import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  const apiKey = searchParams.get('apiKey');

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

  try {
    const streamRes = await fetch(url as string, {
      method: 'POST',
      headers,
      body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: 'Hello' }], stream: true }),
    });

    if (!streamRes.ok || !streamRes.headers.get('content-type')?.includes('text/event-stream')) {
      const errorData = await streamRes.text();
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(`data: Error: ${streamRes.status} - ${errorData}\n\n`);
          controller.close();
        },
      });
      return new NextResponse(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    const stream = new ReadableStream({
      start(controller) {
        streamRes.body?.on('data', (chunk) => {
          controller.enqueue(`data: ${chunk.toString()}\n\n`);
        });
        streamRes.body?.on('end', () => {
          controller.enqueue('data: [DONE]\n\n');
          controller.close();
        });
        streamRes.body?.on('error', (error) => {
          controller.enqueue(`data: Error: ${error.message}\n\n`);
          controller.close();
        });
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(`data: Error: ${(error as Error).message}\n\n`);
        controller.close();
      },
    });
    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  }
}