'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Task } from '@/lib/types';
import { useAppDispatch } from '@/lib/hooks';
import { deleteTask } from '@/lib/slices/taskSlice';
import { TaskFormModal } from './TaskFormModal';
import { useState } from 'react';

export function DataTableRowActions({ task }: { task: Task }) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setOpen(true)}>Edit</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => dispatch(deleteTask(task.id))}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {open && <TaskFormModal task={task} onClose={() => setOpen(false)} />}
    </>
  );
}