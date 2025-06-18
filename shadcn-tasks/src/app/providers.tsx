'use client';

import { SessionProvider } from 'next-auth/react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { store } from '@/lib/store';

/**
 * Global providers:
 *   • Redux (`useAppDispatch`, `useAppSelector`)
 *   • NextAuth (`useSession`, `signIn`, `signOut`)
 *   • next-themes  (dark / light toggle)
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        {/* ThemeProvider gives ThemeToggle its context */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}