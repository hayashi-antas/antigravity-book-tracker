'use client';

import { useEffect, useState } from 'react';
import { useBookStore } from '@/store/useBookStore';
import { useRouter, useParams } from 'next/navigation';
import { Book, BookStatus } from '@/types';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Save, BookOpen, User, Tag } from 'lucide-react';
import Link from 'next/link';

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { books, updateBook, deleteBook } = useBookStore();
  const [book, setBook] = useState<Book | null>(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState<number>(0);

  // Load book effect
  useEffect(() => {
    // Access params.id correctly. Next.js 13+ params are accessed directly from the hook result but might be promises in 15?
    // In current stable (13/14), useParams() returns the object. 
    // params.id should be string or string[].
    const id = params?.id as string;
    if (id) {
      const foundBook = books.find((b) => b.id === id);
      if (foundBook) {
        setBook(foundBook);
        setReview(foundBook.review || '');
        setRating(foundBook.rating || 0);
      } else {
        // handle not found?
        // router.push('/books'); // causing hydration mismatch if too fast?
      }
    }
  }, [params?.id, books]); // dependency on books to react to updates

  if (!book && books.length > 0 && params?.id) {
    const found = books.find(b => b.id === params.id);
    if (!found) {
      return (
        <div className="flex flex-col items-center justify-center p-12 space-y-4">
          <h2 className="text-xl font-semibold">Book not found</h2>
          <Link href="/books"><Button variant="outline">Back to Library</Button></Link>
        </div>
      )
    }
  }

  if (!book) {
    // Loading skeleton
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 w-1/3 bg-stone-200 dark:bg-stone-800 rounded"></div>
        <div className="h-64 w-full bg-stone-200 dark:bg-stone-800 rounded-xl"></div>
      </div>
    )
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = parseInt(e.target.value, 10);
    const updates: Partial<Book> = { currentPage: newPage };

    // Auto status update logic
    if (newPage === 0) updates.status = 'WANT_TO_READ';
    else if (newPage >= (book.pageCount || 1)) updates.status = 'COMPLETED';
    else updates.status = 'READING';

    // Optimistic update
    setBook({ ...book, ...updates });
    updateBook(book.id, updates);
  };

  const saveReview = () => {
    updateBook(book.id, { review, rating: rating > 0 ? rating : undefined });
    toast.success('Review saved successfully!');
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this book?')) {
      deleteBook(book.id);
      toast.success('Book deleted');
      router.push('/books');
    }
  };

  const toggleStatus = () => {
    const nextStatus: Record<BookStatus, BookStatus> = {
      'WANT_TO_READ': 'READING',
      'READING': 'COMPLETED',
      'COMPLETED': 'WANT_TO_READ'
    };
    const newStatus = nextStatus[book.status];
    const updates: Partial<Book> = { status: newStatus };

    // Update dates if needed?
    if (newStatus === 'READING' && !book.startedAt) updates.startedAt = new Date().toISOString();
    if (newStatus === 'COMPLETED') updates.completedAt = new Date().toISOString();

    updateBook(book.id, updates);
    toast.success(`Marked as ${newStatus.replace(/_/g, ' ')}`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8 pb-12"
    >
      <div className="flex items-center justify-between">
        <Link href="/books" className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors flex items-center gap-2">
          <ArrowLeft size={20} /> Back
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDelete} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-900/50">
            <Trash2 size={18} className="mr-2" /> Delete
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] gap-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide border 
                        ${book.status === 'COMPLETED' ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' :
                  book.status === 'READING' ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800' :
                    'bg-stone-100 text-stone-800 border-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700'}`}>
                {book.status.replace(/_/g, ' ')}
              </span>
              <span className="text-stone-400 text-sm flex items-center gap-1">
                <Tag size={12} /> {book.genre}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50 mb-2">{book.title}</h1>
            <div className="flex items-center gap-2 text-lg text-stone-600 dark:text-stone-400 font-medium">
              <User size={18} /> {book.author}
            </div>
          </div>

          {/* Progress Section */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <BookOpen size={18} /> Reading Progress
              </h3>
              <span className="text-sm font-mono text-stone-500">
                {book.currentPage} / {book.pageCount} pages ({Math.round(((book.currentPage || 0) / (book.pageCount || 1)) * 100)}%)
              </span>
            </div>

            <input
              type="range"
              min="0"
              max={book.pageCount || 100}
              value={book.currentPage || 0}
              onChange={handleProgressChange}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer dark:bg-stone-800 accent-stone-900 dark:accent-stone-100"
            />
            <div className="flex justify-between mt-2 text-xs text-stone-400 uppercase tracking-wider font-semibold">
              <span>Start</span>
              <span>Finish</span>
            </div>
          </div>

          {/* Review Section */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Save size={18} /> Thoughts & Review
              </h3>
            </div>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="What did you think about this book? any favorite quotes?"
              className="w-full min-h-[150px] p-4 rounded-xl border border-stone-200 bg-stone-50 dark:bg-stone-950 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-100 resize-y transition-shadow"
            />

            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl transition-transform hover:scale-110 ${star <= rating ? 'text-yellow-400' : 'text-stone-200 dark:text-stone-800'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <Button onClick={saveReview}>Save Review</Button>
            </div>
          </div>
        </div>

        {/* Sidebar / Quick Actions */}
        <div className="space-y-6">
          <div className="bg-stone-50 dark:bg-stone-900/50 p-6 rounded-2xl border border-stone-100 dark:border-stone-800">
            <h4 className="font-semibold mb-4 text-stone-900 dark:text-stone-100">Quick Actions</h4>
            <Button className="w-full justify-start mb-2" variant="outline" onClick={toggleStatus}>
              Advance Status
            </Button>
            {/* Add more metadata view here? AddedAt? */}
            <div className="mt-6 pt-6 border-t border-stone-200 dark:border-stone-800 space-y-3 text-sm text-stone-500">
              <div className="flex justify-between">
                <span>Added</span>
                <span>{new Date(book.addedAt).toLocaleDateString()}</span>
              </div>
              {book.startedAt && (
                <div className="flex justify-between">
                  <span>Started</span>
                  <span>{new Date(book.startedAt).toLocaleDateString()}</span>
                </div>
              )}
              {book.completedAt && (
                <div className="flex justify-between">
                  <span>Completed</span>
                  <span>{new Date(book.completedAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
