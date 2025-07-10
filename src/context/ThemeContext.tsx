import * as React from 'react';

// Performance metrics
const themeMetrics = {
  toggleCount: 0,
  setCount: 0,
  lastToggleTime: 0,
  lastSetTime: 0
};

// Add usage metrics
const themeUsageMetrics = {
  fullContext: 0,
  themeValue: 0,
  themeToggle: 0
};

type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  getMetrics: () => typeof themeMetrics;
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

// Enhanced theme context with optimizations
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = React.memo(({ children }) => {
  const [theme, setThemeState] = React.useState<Theme>(
    () => {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme) {
        return savedTheme;
      } else {
        return mediaQuery.matches ? 'dark' : 'light';
      }
    }
  );
  
  // Memoized theme setters
  const setTheme = React.useCallback((newTheme: Theme) => {
    themeMetrics.setCount++;
    themeMetrics.lastSetTime = Date.now();
    
    // Skip if theme isn't changing
    if (theme !== newTheme) {
      setThemeState(newTheme);
    }
  }, [theme]);

  const toggleTheme = React.useCallback(() => {
    themeMetrics.toggleCount++;
    themeMetrics.lastToggleTime = Date.now();
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Memoized context value
  const contextValue = React.useMemo(() => ({
    theme,
    setTheme,
    toggleTheme,
    getMetrics: () => themeMetrics
  }), [theme, setTheme, toggleTheme]);

  // System preference detection with cleanup
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [setTheme]);

  // DOM updates with transition
  React.useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.documentElement.style.setProperty(
      'color-scheme', 
      theme,
      'important'
    );
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
});

// Optimized hooks
export function useThemeValue(): Theme {
  themeUsageMetrics.themeValue++;
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error('useThemeValue must be used within ThemeProvider');
  return context.theme;
}

export function useThemeToggle(): () => void {
  themeUsageMetrics.themeToggle++;
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error('useThemeToggle must be used within ThemeProvider');
  return context.toggleTheme;
}

export function useTheme(): ThemeContextType {
  themeUsageMetrics.fullContext++;
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

// Debug function to log metrics
if (import.meta.env.DEV) {
  setInterval(() => {
    console.log('Theme Metrics:', themeMetrics);
  }, 10000); // Log every 10 seconds in development
}

// Debug logging
if (import.meta.env.DEV) {
  setInterval(() => {
    console.log('Theme Usage Metrics:', themeUsageMetrics);
  }, 15000);
}

export default ThemeContext;
