import { useContext } from 'react';
import { ThemeCtx } from '../context/ctx';

export function useTheme() {
  const context = useContext(ThemeCtx);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
