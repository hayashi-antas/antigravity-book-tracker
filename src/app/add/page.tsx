'use client';

import { BookForm } from '@/components/BookForm';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AddBookPage() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto py-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">Add a New Book</h1>
        <p className="text-stone-500 dark:text-stone-400">Expand your library.</p>
      </div>

      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800">
        <BookForm
          onSuccess={() => router.push('/books')}
          onCancel={() => router.back()}
        />
      </div>
    </motion.div>
  );
}
