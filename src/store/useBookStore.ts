import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Book, BookStatus } from '@/types';

interface BookState {
  books: Book[];
  addBook: (book: Omit<Book, 'id' | 'addedAt'>) => void;
  updateBook: (id: string, updates: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  moveBook: (id: string, status: BookStatus) => void;
  generateDummyData: () => void;
}

const GENRES = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Fantasy', 'Mystery', 'Biography', 'History', 'Technology', 'Self-Help'];

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
      generateDummyData: () =>
        set((state) => {
          const SEED_BOOKS = [
            { title: "The Little Prince", author: "Antoine de Saint-Exupéry", genre: "Fiction", status: "COMPLETED", rating: 5, review: "A beautiful, timeless story that reminds us of what truly matters." },
            { title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", status: "READING", rating: undefined },
            { title: "Atomic Habits", author: "James Clear", genre: "Self-Help", status: "WANT_TO_READ", rating: undefined },
            { title: "Steve Jobs", author: "Walter Isaacson", genre: "Biography", status: "COMPLETED", rating: 5, review: "A fascinating look into the life of a visionary." },
            { title: "Sapiens", author: "Yuval Noah Harari", genre: "History", status: "READING", rating: undefined },
            { title: "Project Hail Mary", author: "Andy Weir", genre: "Sci-Fi", status: "WANT_TO_READ", rating: undefined }
          ];

          const newBooks: Book[] = SEED_BOOKS.map((b) => {
            const totalPages = Math.floor(Math.random() * 300) + 100;
            return {
              id: crypto.randomUUID(),
              title: b.title,
              author: b.author,
              status: b.status as BookStatus,
              genre: b.genre,
              pageCount: totalPages,
              currentPage: b.status === 'COMPLETED' ? totalPages : b.status === 'WANT_TO_READ' ? 0 : Math.floor(Math.random() * totalPages),
              rating: b.rating,
              review: b.review,
              addedAt: new Date().toISOString(),
            };
          });
          return { books: [...state.books, ...newBooks] };
        }),
    }),
    {
      name: 'book-storage',
    }
  )
);
