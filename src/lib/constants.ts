export const GENRES = [
  'Fiction',
  'Non-Fiction',
  'Sci-Fi',
  'Fantasy',
  'Mystery',
  'Biography',
  'History',
  'Technology',
  'Self-Help',
] as const;

export type Genre = typeof GENRES[number];
