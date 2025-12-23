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
          const TITLES = [
            "The Great Gatsby", "To Kill a Mockingbird", "1984", "Pride and Prejudice",
            "The Catcher in the Rye", "Project Hail Mary", "The Pragmatic Programmer",
            "Clean Code", "Sapiens", "Atomic Habits", "Dune", "Thinking, Fast and Slow",
            "Deep Work", "The Hobbit", "Harry Potter", "The Alchemist", "Educated",
            "Becoming", "Steve Jobs", "Design of Everyday Things", "Zero to One",
            "The Lean Startup", "Refactoring", "Code Complete", "Design Patterns",
            "Head First Java", "Introduction to Algorithms", "The Mythical Man-Month",
            "Cracking the Coding Interview", "Soft Skills"
          ];

          const AUTHORS = [
            "F. Scott Fitzgerald", "Harper Lee", "George Orwell", "Jane Austen",
            "J.D. Salinger", "Andy Weir", "Andrew Hunt", "Robert C. Martin",
            "Yuval Noah Harari", "James Clear", "Frank Herbert", "Daniel Kahneman",
            "Cal Newport", "J.R.R. Tolkien", "J.K. Rowling", "Paulo Coelho",
            "Tara Westover", "Michelle Obama", "Walter Isaacson", "Don Norman",
            "Peter Thiel", "Eric Ries", "Martin Fowler", "Steve McConnell"
          ];

          const GENRES = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Fantasy', 'Mystery', 'Biography', 'History', 'Technology', 'Self-Help'];

          const newBooks: Book[] = Array.from({ length: 50 }).map((_, i) => {
            const titleIndex = i % TITLES.length;
            const authorIndex = i % AUTHORS.length;

            const title = i < TITLES.length ? TITLES[titleIndex] : `${TITLES[titleIndex]} (Vol. ${Math.floor(i / TITLES.length) + 1})`;
            const author = AUTHORS[authorIndex];

            const status = ['WANT_TO_READ', 'READING', 'COMPLETED'][Math.floor(Math.random() * 3)] as BookStatus;
            const totalPages = Math.floor(Math.random() * 400) + 100;

            return {
              id: crypto.randomUUID(),
              title,
              author,
              status,
              genre: GENRES[Math.floor(Math.random() * GENRES.length)],
              pageCount: totalPages,
              currentPage: status === 'COMPLETED' ? totalPages : status === 'WANT_TO_READ' ? 0 : Math.floor(Math.random() * totalPages),
              rating: status === 'COMPLETED' ? Math.floor(Math.random() * 5) + 1 : undefined,
              addedAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
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
