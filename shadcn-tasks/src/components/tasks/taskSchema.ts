// src/components/tasks/taskSchema.ts
import { z } from 'zod'

/** Validation schema for Add/Edit */
export const TaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  completed: z.boolean(),
})

export type TaskInput = z.infer<typeof TaskSchema>