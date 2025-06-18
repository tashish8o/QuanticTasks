// src/components/tasks/TaskForm.tsx
'use client';

import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TaskInput, TaskSchema } from './taskSchema'
import { useAppDispatch } from '@/lib/hooks'
import { createTask, updateTask } from '@/lib/slices/taskSlice'
import { Task } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface Props {
  initialData?: Task
  onSuccess: () => void
}

export function TaskForm({ initialData, onSuccess }: Props) {
  const dispatch = useAppDispatch()
  const isEdit = Boolean(initialData)

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TaskInput>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      completed: initialData?.completed ?? false,
    },
  })

  // reset when opening for a different task
  useEffect(() => {
    reset(
      initialData
        ? { title: initialData.title, completed: initialData.completed }
        : { title: '', completed: false }
    )
  }, [initialData, reset])

  const onSubmit = (data: TaskInput) => {
    if (isEdit && initialData) {
      dispatch(updateTask({ id: initialData.id, data }))
    } else {
      dispatch(createTask({ userId: 1, title: data.title, completed: data.completed }))
    }
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4 px-6">
      {/* Title */}
      <div>
        <Label htmlFor="title">Title</Label>
        <br/>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              id="title"
              placeholder="Task title"
              {...field}
              className="w-full px-4 py-2"
            />
          )}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      {/* Completed */}
      <div className="flex items-center justify-between">
        <Label htmlFor="completed">Completed</Label>
        <Controller
          name="completed"
          control={control}
          render={({ field }) => (
            <Switch
              id="completed"
              checked={field.value}
              onCheckedChange={(v) => field.onChange(Boolean(v))}
            />
          )}
        />
      </div>

      {/* Submit */}
      <div className="text-right">
        <Button type="submit">{isEdit ? 'Save changes' : 'Add task'}</Button>
      </div>
    </form>
  )
}