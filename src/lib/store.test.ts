import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useBookStore } from '@/store/useBookStore';

// Initial state cleanup
const initialState = useBookStore.getState();

describe('useBookStore', () => {
  beforeEach(() => {
    useBookStore.setState(initialState, true); // Reset store
    localStorage.clear();
  });

  it('should start with empty books', () => {
    const { books } = useBookStore.getState();
    expect(books).toEqual([]);
  });

  it('should add a book', () => {
    useBookStore.getState().addBook({
      title: 'Test Book',
      author: 'Test Author',
      status: 'WANT_TO_READ',
      genre: 'Fiction',
      pageCount: 100,
      currentPage: 0,
    });

    const { books } = useBookStore.getState();
    expect(books).toHaveLength(1);
    expect(books[0].title).toBe('Test Book');
    expect(books[0].id).toBeDefined();
  });

  it('should delete a book', () => {
    // Add first
    useBookStore.getState().addBook({
      title: 'To Delete',
      author: 'Unknown',
      status: 'WANT_TO_READ',
      genre: 'Fiction',
    });

    const addedBook = useBookStore.getState().books[0];
    expect(useBookStore.getState().books).toHaveLength(1);

    // Delete
    useBookStore.getState().deleteBook(addedBook.id);
    expect(useBookStore.getState().books).toHaveLength(0);
  });

  it('should update a book', () => {
    useBookStore.getState().addBook({
      title: 'Original Title',
      author: 'Author',
      status: 'WANT_TO_READ',
      genre: 'Fiction'
    });
    const id = useBookStore.getState().books[0].id;

    useBookStore.getState().updateBook(id, { title: 'Updated Title' });
    expect(useBookStore.getState().books[0].title).toBe('Updated Title');
  });
});
