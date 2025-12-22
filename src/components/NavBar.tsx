'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Book as BookIcon, LayoutDashboard, Library, Plus } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { BookForm } from './BookForm';

export function NavBar() {
  const pathname = usePathname();
  const [showAddForm, setShowAddForm] = useState(false);

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/books', label: 'My Books', icon: Library },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="p-1.5 bg-stone-900 rounded-md dark:bg-stone-50">
                <BookIcon className="h-4 w-4 text-stone-50 dark:text-stone-900" />
              </div>
              <span className="hidden sm:inline-block">BookTracker</span>
            </Link>

            <nav className="flex items-center gap-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium transition-colors hover:text-stone-900 dark:hover:text-stone-50",
                      isActive
                        ? "text-stone-900 dark:text-stone-50"
                        : "text-stone-500 dark:text-stone-400"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <Button size="sm" onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Add Book</span>
            <span className="inline sm:hidden">Add</span>
          </Button>
        </div>
      </header>

      {/* Add Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 dark:bg-stone-950 dark:border dark:border-stone-800">
            <div className="p-6 border-b border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-semibold">Add New Book</h2>
              <p className="text-sm text-stone-500">Enter details to track a new book.</p>
            </div>
            <div className="p-6">
              <BookForm
                onSuccess={() => setShowAddForm(false)}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
