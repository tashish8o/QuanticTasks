// src/utils/localStorage.ts
// small helper to load & save the tasks array in localStorage

const KEY = 'shadcn-tasks:items';

export function loadTasks(): string | null {
  try {
    return typeof window !== 'undefined' ? localStorage.getItem(KEY) : null;
  } catch {
    return null; // Safari private-mode etc.
  }
}

export function saveTasks(payload: string): void {
  try {
    localStorage.setItem(KEY, payload);
  } catch {
    /* ignore write errors */
  }
}