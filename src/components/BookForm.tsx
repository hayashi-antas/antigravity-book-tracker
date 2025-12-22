import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useBookStore } from '@/store/useBookStore';
import { Book, BookStatus } from '@/types';
import { useState, useEffect } from 'react';

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  pageCount: z.number().min(0, 'Page count must be positive'),
  status: z.enum(['WANT_TO_READ', 'READING', 'COMPLETED'] as const),
});

type BookFormData = z.infer<typeof bookSchema>;

interface BookFormProps {
  initialData?: Book;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BookForm({ initialData, onSuccess, onCancel }: BookFormProps) {
  const { addBook, updateBook } = useBookStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: initialData?.title || '',
      author: initialData?.author || '',
      pageCount: initialData?.pageCount || 0,
      status: initialData?.status || 'WANT_TO_READ',
    },
  });

  // Reset form when initialData changes (if reusing component instance)
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        author: initialData.author,
        pageCount: initialData.pageCount || 0,
        status: initialData.status,
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data: BookFormData) => {
    setLoading(true);
    // Simulate slight delay for UX
    setTimeout(() => {
      if (initialData) {
        updateBook(initialData.id, {
          ...data,
          pageCount: data.pageCount || 0,
        });
      } else {
        addBook({
          title: data.title,
          author: data.author,
          status: data.status,
          pageCount: data.pageCount || 0,
          currentPage: 0,
        });
      }

      if (!initialData) reset();
      setLoading(false);
      onSuccess?.();
    }, 300);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Title
        </label>
        <Input placeholder="Enter book title" {...register('title')} />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Author
        </label>
        <Input placeholder="Enter author name" {...register('author')} />
        {errors.author && <p className="text-sm text-red-500">{errors.author.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Pages</label>
          <Input
            type="number"
            placeholder="0"
            {...register('pageCount', { valueAsNumber: true })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Status</label>
          <select
            className="flex h-10 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-800 dark:bg-stone-950 dark:ring-offset-stone-950 dark:focus-visible:ring-stone-300"
            {...register('status')}
          >
            <option value="WANT_TO_READ">Want to Read</option>
            <option value="READING">Reading</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
        )}
        <Button type="submit" isLoading={loading}>
          {initialData ? 'Save Changes' : 'Add Book'}
        </Button>
      </div>
    </form>
  );
}
