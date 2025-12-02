import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// =============================================================================
// TYPES
// =============================================================================

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  _hasHydrated: boolean;
}

interface ThemeStore extends ThemeState {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setHasHydrated: (state: boolean) => void;
}

// =============================================================================
// STORE
// =============================================================================

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'dark', // Default to dark theme
      _hasHydrated: false,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'landing-theme-storage',
      partialize: (state) => ({ theme: state.theme }), // Only persist theme, not hydration state
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

// =============================================================================
// HOOKS (for SSR-safe usage)
// =============================================================================

// Hook to safely use theme on client-side (avoids hydration mismatch)
export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const hasHydrated = useThemeStore((state) => state._hasHydrated);
  const setTheme = useThemeStore((state) => state.setTheme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  // Track if component has mounted (client-side)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return loading state until hydrated
  const isReady = mounted && hasHydrated;

  return {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    setTheme,
    toggleTheme,
    isReady, // Use this to show loading state or prevent flash
  };
};
