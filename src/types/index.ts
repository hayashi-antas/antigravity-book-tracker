export type BookStatus = 'WANT_TO_READ' | 'READING' | 'COMPLETED';

export interface Book {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  rating?: number; // 0-5
  coverUrl?: string; // Integrated with Google Books API if needed later, or manual
  pageCount?: number;
  currentPage?: number;
  startedAt?: string; // ISO date string
  completedAt?: string; // ISO date string
  notes?: string;
  genre: string;
  addedAt: string;
}
