'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useBookStore } from '@/store/useBookStore';
import { BookCard } from './BookCard';
import { Input } from './ui/Input';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const ITEMS_PER_PAGE = 12;

export function BookList() {
  const { books } = useBookStore();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Filter books
  const filteredBooks = useMemo(() => {
    return books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      (book.genre && book.genre.toLowerCase().includes(query.toLowerCase()))
    );
  }, [books, query]);

  // Reset page when query changes
  useEffect(() => {
    setPage(1);
  }, [query]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [filteredBooks]);

  const displayedBooks = filteredBooks.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = displayedBooks.length < filteredBooks.length;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto md:mx-0">
        <Search className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
        <Input
          placeholder="Search by title, author, or genre..."
          className="pl-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* List */}
      {displayedBooks.length === 0 ? (
        <div className="text-center py-20 text-stone-500">
          No books found.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayedBooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} // Trigger when scrolls into view
              viewport={{ once: true }}
              transition={{ delay: (index % ITEMS_PER_PAGE) * 0.05, duration: 0.3 }}
            >
              <BookCard book={book} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Loader / Observer Target */}
      {hasMore && (
        <div ref={observerTarget} className="flex justify-center py-8">
          <div className="animate-pulse text-stone-400 text-sm">Loading more books...</div>
        </div>
      )}
    </div>
  );
}
