'use client';

import { useState, useEffect } from 'react';
import { useBookStore } from '@/store/useBookStore';
import { BookCard } from '@/components/BookCard';
import { BookForm } from '@/components/BookForm';
import { Stats } from '@/components/Stats';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Plus, Search, Book as BookIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function Home() {
  const { books } = useBookStore();
  const [isClient, setIsClient] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Hydration fix
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen text-stone-500">
        Loading Library...
      </div>
    );
  }

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-stone-50/50 p-6 md:p-12 dark:bg-stone-950">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-stone-900 rounded-lg dark:bg-stone-50">
              <BookIcon className="h-6 w-6 text-stone-50 dark:text-stone-900" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">Book Tracker</h1>
          </div>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Book
          </Button>
        </div>

        {/* Stats */}
        <Stats />

        {/* Filters and List */}
        <div className="space-y-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
            <Input
              placeholder="Search by title or author..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {books.length === 0 ? (
            <Card className="flex flex-col items-center justify-center py-16 text-center text-stone-500">
              <BookIcon className="h-12 w-12 mb-4 opacity-20" />
              <p className="text-lg font-medium">No books tracked yet</p>
              <p className="text-sm">Add your first book to get started!</p>
              <Button className="mt-4" variant="outline" onClick={() => setShowAddForm(true)}>
                Add a Book
              </Button>
            </Card>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              No books found matching "{searchQuery}"
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredBooks.map((book) => (
                <div key={book.id} className="h-full">
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 dark:bg-stone-950 dark:border dark:border-stone-800">
            <div className="p-6 border-b border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-semibold">Add New Book</h2>
              <p className="text-sm text-stone-500">Enter the details of the book you want to track.</p>
            </div>
            <div className="p-6">
              <BookForm
                onSuccess={() => setShowAddForm(false)}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
