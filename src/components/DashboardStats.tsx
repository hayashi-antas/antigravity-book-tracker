'use client';

import { useBookStore } from '@/store/useBookStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

// Custom tooltip for better visualization
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-stone-200 rounded-lg shadow-lg dark:bg-stone-900 dark:border-stone-800">
        <p className="font-medium text-sm">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export function DashboardStats() {
  const { books, generateDummyData } = useBookStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalBooks = books.length;
  const completed = books.filter(b => b.status === 'COMPLETED').length;
  const reading = books.filter(b => b.status === 'READING').length;
  const wantToRead = books.filter(b => b.status === 'WANT_TO_READ').length;

  // Genre Distribution
  const genreCounts = books.reduce((acc, book) => {
    const genre = book.genre || 'Uncategorized';
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const genreData = Object.entries(genreCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const statusData = [
    { name: 'Completed', value: completed, color: '#22c55e' },
    { name: 'Reading', value: reading, color: '#3b82f6' },
    { name: 'Want to Read', value: wantToRead, color: '#eab308' },
  ].filter(d => d.value > 0);

  // Reading Progress (Average % for currently reading)
  const readingBooks = books.filter(b => b.status === 'READING' && (b.pageCount || 0) > 0);
  const avgProgress = readingBooks.length > 0
    ? Math.round(readingBooks.reduce((acc, b) => acc + (b.currentPage || 0) / (b.pageCount || 1), 0) / readingBooks.length * 100)
    : 0;

  const COLORS = ['#0ea5e9', '#22c55e', '#eab308', '#f97316', '#ef4444', '#8b5cf6', '#ec4899', '#64748b'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-stone-500 dark:text-stone-400">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-stone-500 dark:text-stone-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBooks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-stone-500 dark:text-stone-400">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-stone-500 dark:text-stone-400">Avg. Progress (Reading)</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgProgress}%</div>
            <p className="text-xs text-stone-500 mt-1">Across {readingBooks.length} active books</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Genre Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {genreData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {genreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-stone-500">No data available</div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Reading Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-stone-500">No data available</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dev Tool */}
      {process.env.NODE_ENV === 'development' && (
        <div className="flex justify-center p-4">
          <button
            onClick={generateDummyData}
            className="text-xs text-stone-400 hover:text-stone-900 underline"
          >
            Generate Demo Data
          </button>
        </div>
      )}
    </div>
  );
}
