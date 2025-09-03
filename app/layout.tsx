import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FrameForge AI - Craft Farcaster Frames with AI',
  description: 'Create compelling Farcaster Frames using AI prompts, no code needed.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark-bg text-white min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
