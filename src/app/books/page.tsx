'use client';

import { BookList } from '@/components/BookList';
import { motion } from 'framer-motion';

export default function BooksPage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">My Library</h1>
        <p className="text-stone-500 dark:text-stone-400">Manage and view your collection.</p>
      </div>

      <BookList />
    </motion.div>
  );
}
