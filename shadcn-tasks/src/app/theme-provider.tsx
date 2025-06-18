'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * Wraps the app so that:
 *   • system dark/light preference is respected on first paint
 *   • when the user toggles, <html class="dark"> flips instantly
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"     // adds / removes the "dark" class
      defaultTheme="system" // follow OS by default
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}