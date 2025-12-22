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
          const REALISTIC_BOOKS = [
            { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
            { title: "To Kill a Mockingbird", author: "Harper Lee" },
            { title: "1984", author: "George Orwell" },
            { title: "Pride and Prejudice", author: "Jane Austen" },
            { title: "The Catcher in the Rye", author: "J.D. Salinger" },
            { title: "Project Hail Mary", author: "Andy Weir" },
            { title: "The Pragmatic Programmer", author: "Andrew Hunt" },
            { title: "Clean Code", author: "Robert C. Martin" },
            { title: "Sapiens", author: "Yuval Noah Harari" },
            { title: "Atomic Habits", author: "James Clear" },
            { title: "Dune", author: "Frank Herbert" },
            { title: "Thinking, Fast and Slow", author: "Daniel Kahneman" },
            { title: "Deep Work", author: "Cal Newport" },
            { title: "The Hobbit", author: "J.R.R. Tolkien" },
            { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling" },
            { title: "The Alchemist", author: "Paulo Coelho" },
            { title: "Educated", author: "Tara Westover" },
            { title: "Becoming", author: "Michelle Obama" },
            { title: "Steve Jobs", author: "Walter Isaacson" },
            { title: "The Design of Everyday Things", author: "Don Norman" }
          ];

          // Import here to avoid circular dependencies if any, or use the locally defined one if preferred.
          // We will use a local genre list for simplicity or the string literals.
          const GENRE_LIST = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Fantasy', 'Mystery', 'Biography', 'History', 'Technology', 'Self-Help'];

          const newBooks: Book[] = REALISTIC_BOOKS.map((b, i) => {
            const status = ['WANT_TO_READ', 'READING', 'COMPLETED'][Math.floor(Math.random() * 3)] as BookStatus;
            const totalPages = Math.floor(Math.random() * 400) + 150;
            return {
              id: crypto.randomUUID(),
              title: b.title,
              author: b.author,
              status,
              genre: GENRE_LIST[Math.floor(Math.random() * GENRE_LIST.length)],
              pageCount: totalPages,
              currentPage: status === 'COMPLETED' ? totalPages : status === 'WANT_TO_READ' ? 0 : Math.floor(Math.random() * totalPages),
              rating: status === 'COMPLETED' ? Math.floor(Math.random() * 5) + 1 : undefined,
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
