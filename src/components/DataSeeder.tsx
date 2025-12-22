'use client';

import { useBookStore } from '@/store/useBookStore';
import { useEffect, useRef } from 'react';

export function DataSeeder() {
  const { books, generateDummyData } = useBookStore();
  const initialized = useRef(false);

  useEffect(() => {
    // Only run once on mount
    if (!initialized.current) {
      initialized.current = true;
      if (books.length === 0) {
        generateDummyData();
      }
    }
  }, [books.length, generateDummyData]);

  return null;
}
