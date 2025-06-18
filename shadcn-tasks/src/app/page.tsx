// src/app/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useSession, signIn, signOut } from 'next-auth/react';
import { TaskFormModal } from '@/components/tasks/TaskFormModal';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

// Dynamically import the TaskTable component, disable SSR
const TaskTable = dynamic(
  () => import('@/components/tasks/TaskTable').then((mod) => mod.TaskTable),
  { ssr: false }
);

export default function Page() {
  const { status } = useSession();  // NextAuth session status (authenticated or not)

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <div className="flex items-center gap-2">
          {status === 'authenticated' ? (
            <Button variant="outline" onClick={() => signOut({ callbackUrl: '/' })}>
              Sign Out
            </Button>
          ) : (
            <Button variant="outline" onClick={() => signIn()}>
              Sign In
            </Button>
          )}
          <TaskFormModal triggerLabel="Add Task" />
          <ThemeToggle />
        </div>
      </header>

      <TaskTable />
    </div>
  );
}