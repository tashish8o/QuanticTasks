'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Task } from '@/lib/types';
import { TaskForm } from '@/components/tasks/TaskForm';
import { useState } from 'react';

interface Props {
  task?: Task;
  triggerLabel?: string;
  onClose?: () => void;
}

export function TaskFormModal({ task, triggerLabel, onClose }: Props) {
  const [open, setOpen] = useState(false);
  const isEdit = !!task;

  const close = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={isEdit ? 'ghost' : 'default'}>
          {triggerLabel ?? (isEdit ? 'Edit Task' : 'Add Task')}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Task' : 'New Task'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Modify the fields and save your changes.'
              : 'Fill the form and create a new task.'}
          </DialogDescription>
        </DialogHeader>

        <TaskForm initialData={task} onSuccess={close} />
      </DialogContent>
    </Dialog>
  );
}