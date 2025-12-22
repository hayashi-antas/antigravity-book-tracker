import { Book, BookStatus } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { useBookStore } from '@/store/useBookStore';
import { Trash2, BookOpen, CheckCircle, Clock, Edit2 } from 'lucide-react';
import { clsx } from 'clsx';
import { useState } from 'react';
import { BookForm } from './BookForm';

interface BookCardProps {
  book: Book;
}

const statusConfig: Record<BookStatus, { label: string; icon: React.ReactNode; color: string }> = {
  WANT_TO_READ: { label: 'Want to Read', icon: <Clock className="h-4 w-4" />, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' },
  READING: { label: 'Reading', icon: <BookOpen className="h-4 w-4" />, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' },
  COMPLETED: { label: 'Completed', icon: <CheckCircle className="h-4 w-4" />, color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' },
};

export function BookCard({ book }: BookCardProps) {
  const { deleteBook, moveBook } = useBookStore();
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <Card className="h-full border-2 border-stone-900 dark:border-stone-50">
        <CardHeader>
          <CardTitle>Edit Book</CardTitle>
        </CardHeader>
        <CardContent>
          <BookForm
            initialData={book}
            onSuccess={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow group">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="line-clamp-2 leading-tight" title={book.title}>{book.title}</CardTitle>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 line-clamp-1">{book.author}</p>
          </div>
          <span className={clsx('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0', statusConfig[book.status].color)}>
            {statusConfig[book.status].icon}
            {/* Shorten label on mobile if needed, but flex wrap handles it */}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {book.status === 'READING' && book.pageCount && book.currentPage !== undefined && (
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{Math.round((book.currentPage / book.pageCount) * 100)}%</span>
            </div>
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden dark:bg-stone-800">
              <div
                className="h-full bg-stone-900 dark:bg-stone-50 transition-all duration-500"
                style={{ width: `${(book.currentPage / book.pageCount) * 100}%` }}
              />
            </div>
            <p className="text-xs text-stone-500 mt-1">{book.currentPage} of {book.pageCount} pages</p>
          </div>
        )}
        {book.rating && (
          <div className="mt-2 flex text-yellow-500">
            {'★'.repeat(book.rating)}{'☆'.repeat(5 - book.rating)}
          </div>
        )}
      </CardContent>
      <CardFooter className="gap-2 justify-end pt-2">
        {/* Edit Button */}
        <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
          <Edit2 className="h-4 w-4 text-stone-500" />
        </Button>

        {book.status === 'WANT_TO_READ' && (
          <Button size="sm" variant="outline" onClick={() => moveBook(book.id, 'READING')}>
            Start
          </Button>
        )}
        {book.status === 'READING' && (
          <Button size="sm" variant="outline" onClick={() => moveBook(book.id, 'COMPLETED')}>
            Finish
          </Button>
        )}
        <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950" onClick={() => deleteBook(book.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
