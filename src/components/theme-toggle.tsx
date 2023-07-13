'use client';

import { cn } from '@/lib/utils';
import { FC, HTMLAttributes } from 'react';
import { useTheme } from 'next-themes';
import { Icons } from '@/components/icons';

interface ThemeToggleProps extends HTMLAttributes<HTMLButtonElement> {}

const ThemeToggle: FC<ThemeToggleProps> = ({ className, ...props }) => {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <button
      onClick={() => changeTheme()}
      className={cn('flex items-center gap-2 cursor-pointer', className)}
      {...props}>
      {theme === 'light' ? <Icons.sun className="h-4 w-4" /> : <Icons.moon className="h-4 w-4" />}
      <span className="capitalize">{theme + ' mode'}</span>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
export default ThemeToggle;
