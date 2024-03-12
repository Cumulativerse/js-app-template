import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from '@/components/layout/store-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_APP_TITLE,
    template: '%s | ' + process.env.NEXT_PUBLIC_APP_TITLE,
  },
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  keywords: ['app', 'next.js examples'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${inter.className} min-h-screen`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
