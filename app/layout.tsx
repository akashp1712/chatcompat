import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin']});

export const metadata = {
  title: 'ChatCompat',
  description: 'Test OpenAI /chat/completion compatibility',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>{children}</body>
    </html>
  );
}