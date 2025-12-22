import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NavBar } from '@/components/NavBar';
import { DataSeeder } from '@/components/DataSeeder';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Book Tracker',
  description: 'Track your reading journey',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-stone-50/50 dark:bg-stone-950">
          <NavBar />
          <DataSeeder />
          <main className="container mx-auto p-4 md:p-8">
            {children}
          </main>
          <Toaster position="bottom-right" />
        </div>
      </body>
    </html>
  );
}
