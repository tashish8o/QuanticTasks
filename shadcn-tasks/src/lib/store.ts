import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './slices/taskSlice';

export const store = configureStore({
  reducer: { tasks: tasksReducer },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;