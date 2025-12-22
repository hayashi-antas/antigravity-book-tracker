import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Book, BookStatus } from '@/types';

interface BookState {
  books: Book[];
  addBook: (book: Omit<Book, 'id' | 'addedAt'>) => void;
  updateBook: (id: string, updates: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  moveBook: (id: string, status: BookStatus) => void;
}

export const useBookStore = create<BookState>()(
  persist(
    (set) => ({
      books: [],
      addBook: (book) =>
        set((state) => ({
          books: [
            ...state.books,
            {
              ...book,
              id: crypto.randomUUID(),
              addedAt: new Date().toISOString(),
            },
          ],
        })),
      updateBook: (id, updates) =>
        set((state) => ({
          books: state.books.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        })),
      deleteBook: (id) =>
        set((state) => ({
          books: state.books.filter((b) => b.id !== id),
        })),
      moveBook: (id, status) =>
        set((state) => ({
          books: state.books.map((b) =>
            b.id === id ? { ...b, status } : b
          ),
        })),
    }),
    {
      name: 'book-storage',
    }
  )
);
