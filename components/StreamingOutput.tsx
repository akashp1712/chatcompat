interface StreamingOutputProps {
    output: string;
  }
  
  export default function StreamingOutput({ output }: StreamingOutputProps) {
    const lines = output.split('\n').slice(-50).join('\n');
  
    return (
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">Streaming Output</h3>
        <pre className="mt-2 bg-gray-50 text-gray-800 p-4 rounded-md h-40 overflow-auto text-sm font-mono whitespace-pre-wrap">
          {lines}
        </pre>
      </div>
    );
  }