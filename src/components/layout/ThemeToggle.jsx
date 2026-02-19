import { useTheme } from '../../hooks/useTheme';
import { SunIcon, MoonIcon } from '../icons';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-gray-100 hover:text-accent dark:text-slate dark:hover:bg-navy-700 dark:hover:text-accent-light"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
