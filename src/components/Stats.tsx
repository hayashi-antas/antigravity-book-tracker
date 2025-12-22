import { useBookStore } from '@/store/useBookStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

export function Stats() {
  const { books } = useBookStore();

  const totalBooks = books.length;
  const completed = books.filter(b => b.status === 'COMPLETED').length;
  const reading = books.filter(b => b.status === 'READING').length;
  const wantToRead = books.filter(b => b.status === 'WANT_TO_READ').length;

  const data = [
    { name: 'Completed', value: completed, color: '#22c55e' }, // green-500
    { name: 'Reading', value: reading, color: '#3b82f6' }, // blue-500
    { name: 'Want to Read', value: wantToRead, color: '#eab308' }, // yellow-500
  ].filter(d => d.value > 0);

  const totalPagesRead = books.reduce((acc, book) => acc + (book.currentPage || 0), 0);
  const totalPages = books.reduce((acc, book) => acc + (book.pageCount || 0), 0);

  if (totalBooks === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-stone-500 dark:text-stone-400">Total Books</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBooks}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-stone-500 dark:text-stone-400">Pages Read</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPagesRead}</div>
          <p className="text-xs text-stone-500">
            of {totalPages} possible
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-stone-500 dark:text-stone-400">Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                itemStyle={{ color: 'var(--foreground)' }}
              />
              <Legend verticalAlign="middle" layout="vertical" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
