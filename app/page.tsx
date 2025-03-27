import TestForm from '@/components/TestForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900">ChatCompat</h1>
          <p className="mt-1 text-sm text-gray-500">Test OpenAI /chat/completion compatibility with ease</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          <TestForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white p-4 text-center border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Powered by{' '}
          <a href="https://lessentext.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Lessentext.com
          </a>
        </p>
      </footer>
    </div>
  );
}