// src/components/tasks/columns.tsx
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Task } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { deleteTask } from '@/lib/slices/taskSlice';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TaskForm } from './TaskForm';

export const columns: ColumnDef<Task>[] = [
  // ── Selection checkbox
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // ── User ID
  {
    accessorKey: 'userId',
    header: 'User ID',
    cell: ({ getValue }) => <span className="font-mono">{getValue<number>()}</span>,
  },

  // ── Task ID
  {
    accessorKey: 'id',
    header: 'Task ID',
    cell: ({ getValue }) => <span className="font-mono">{getValue<number>()}</span>,
  },

  // ── Title
  {
    accessorKey: 'title',
    header: 'Title',
  },

  // ── Status badge (columnId is now "completed" to match filter)
  {
    accessorKey: 'completed',
    header: 'Status',
    cell: ({ getValue }) => {
      const done = getValue<boolean>();
      return (
        <Badge
          variant={done ? 'default' : 'destructive'}
          className={done ? 'bg-green-600 text-white' : undefined}
        >
          {done ? 'Completed' : 'Incomplete'}
        </Badge>
      );
    },
  },

  // ── Inline Edit / Delete
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const dispatch = useAppDispatch();
      const [open, setOpen] = useState(false);

      return (
        <>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(deleteTask(row.original.id))}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>

          {open && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <TaskForm
                  initialData={row.original}
                  onSuccess={() => setOpen(false)}
                />
              </DialogContent>
            </Dialog>
          )}
        </>
      );
    },
  },
];