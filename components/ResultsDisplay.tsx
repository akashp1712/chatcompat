import { Badge } from '@/components/ui/badge';

interface ResultsDisplayProps {
  results: {
    payloadCompatibility: string;
    responseCompatibility: string;
    streamingSupport: string;
    logs: string[];
  };
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Results</h3>
      <div className="mt-4 flex space-x-6">
        <div>
          <p className="text-sm text-gray-600">Payload Compatibility</p>
          <Badge
            variant={results.payloadCompatibility === 'pass' ? 'default' : 'destructive'}
            className="mt-1 px-3 py-1 text-sm"
          >
            {results.payloadCompatibility}
          </Badge>
        </div>
        <div>
          <p className="text-sm text-gray-600">Response Compatibility</p>
          <Badge
            variant={results.responseCompatibility === 'pass' ? 'default' : 'destructive'}
            className="mt-1 px-3 py-1 text-sm"
          >
            {results.responseCompatibility}
          </Badge>
        </div>
        <div>
          <p className="text-sm text-gray-600">Streaming Support</p>
          <Badge
            variant={results.streamingSupport === 'pass' ? 'default' : 'destructive'}
            className="mt-1 px-3 py-1 text-sm"
          >
            {results.streamingSupport}
          </Badge>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700">Logs</h4>
        <pre className="mt-2 bg-gray-50 text-gray-800 p-4 rounded-md text-sm font-mono whitespace-pre-wrap">
          {results.logs.join('\n')}
        </pre>
      </div>
    </div>
  );
}