'use client';

import { DashboardStats } from '@/components/DashboardStats';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">Dashboard</h1>
        <p className="text-stone-500 dark:text-stone-400">Overview of your reading habits and library statistics.</p>
      </div>

      <DashboardStats />
    </motion.div>
  );
}
