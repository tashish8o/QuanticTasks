// src/lib/slices/taskSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '@/lib/types';

// Point at your live JSON-Server (tasks API)
const API = 'https://json-api-vqw8.onrender.com/todos';

/** FETCH */
export const fetchTasks = createAsyncThunk<Task[], number | undefined>(
  'tasks/fetch',
  async (userId) => {
    const query = userId ? `?userId=${userId}` : '';
    const res = await fetch(`${API}${query}`);
    if (!res.ok) throw new Error('Fetch failed');
    return (await res.json()) as Task[];
  }
);

/** CREATE */
export interface NewTaskPayload {
  userId: number;
  title: string;
  completed: boolean;
}
export const createTask = createAsyncThunk<Task, NewTaskPayload>(
  'tasks/create',
  async (newTask) => {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    if (!res.ok) throw new Error('Create failed');
    return (await res.json()) as Task;
  }
);

/** UPDATE */
export interface UpdateTaskPayload {
  id: number;
  data: Partial<Omit<Task, 'id' | 'userId'>>;
}
export const updateTask = createAsyncThunk<Task, UpdateTaskPayload>(
  'tasks/update',
  async ({ id, data }) => {
    const res = await fetch(`${API}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Update failed');
    return (await res.json()) as Task;
  }
);

/** DELETE */
export const deleteTask = createAsyncThunk<number, number>(
  'tasks/delete',
  async (id) => {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    return id;
  }
);

interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // FETCH
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error';
      })

      // CREATE
      .addCase(createTask.fulfilled, (state, action) => {
        // Prepend the new task to the list
        state.items.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      });
  },
});

export const tasksReducer = slice.reducer;