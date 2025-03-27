"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import ResultsDisplay from './ResultsDisplay';
import StreamingOutput from './StreamingOutput';

export default function TestForm() {
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [payload, setPayload] = useState({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Hello, are you compatible?' }],
    stream: false,
  });
  const [results, setResults] = useState<any>(null);
  const [streamingOutput, setStreamingOutput] = useState('');

  const testEndpoint = async () => {
    setResults(null);
    setStreamingOutput('');

    const res = await fetch('/api/test', {
      method: 'POST',
      body: JSON.stringify({ url, apiKey, payload }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setResults(data);

    if (payload.stream) {
      const es = new EventSource(`/api/test-stream?url=${encodeURIComponent(url)}&apiKey=${encodeURIComponent(apiKey)}`);
      es.onmessage = (event) => setStreamingOutput((prev) => prev + event.data + '\n');
      es.onerror = () => es.close();
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <Label htmlFor="url" className="text-gray-700 font-medium">Server URL</Label>
        <Input
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/v1/chat/completions"
          className="mt-1 border-gray-300"
        />
      </div>
      <div>
        <Label htmlFor="apiKey" className="text-gray-700 font-medium">API Key (optional)</Label>
        <Input
          id="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
          className="mt-1 border-gray-300"
        />
      </div>
      <div>
        <Label className="text-gray-700 font-medium">Payload</Label>
        <div className="mt-1">
          <JSONInput
            id="json-editor"
            placeholder={payload}
            locale={locale}
            height="200px"
            width="100%"
            onChange={(event: { jsObject?: typeof payload; error?: any }) => {
              if (event.jsObject) {
                setPayload(event.jsObject);
              }
            }}
            style={{
              body: { backgroundColor: '#ffffff', color: '#333', fontSize: '14px', fontFamily: 'Inter, sans-serif' },
              label: { color: '#666' },
              string: { color: '#d14' },
              number: { color: '#099' },
              boolean: { color: '#07a' },
              null: { color: '#90c' },
            }}
          />
        </div>
      </div>
      <Button
        onClick={testEndpoint}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all"
      >
        Test Endpoint
      </Button>
      {results && <ResultsDisplay results={results} />}
      {streamingOutput && <StreamingOutput output={streamingOutput} />}
    </div>
  );
}